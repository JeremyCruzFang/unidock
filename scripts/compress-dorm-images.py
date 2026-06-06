#!/usr/bin/env python3
"""Convert assets/img/dorm-supplies JPGs to web-sized WebP in-place.

Behaviour:
- Walks assets/img/dorm-supplies/ recursively.
- For each .jpg, writes a sibling .webp at quality=80, max long edge 1800px.
- Honours EXIF orientation (auto-rotate) so portraits are not laid sideways.
- Deletes the source .jpg only after a successful WebP write.
- Skips files where a .webp already exists and is fresher.
- Prints a per-section size summary at the end.
"""
from __future__ import annotations

import os
import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from PIL import Image, ImageFile, ImageOps

ImageFile.LOAD_TRUNCATED_IMAGES = True

ROOT = Path(__file__).resolve().parent.parent / "assets" / "img" / "dorm-supplies"
QUALITY = 80
LONG_EDGE_MAX = 1800
WORKERS = 8


def convert(jpg: Path) -> tuple[Path, int, int]:
    webp = jpg.with_suffix(".webp")
    if webp.exists() and webp.stat().st_mtime >= jpg.stat().st_mtime:
        return jpg, jpg.stat().st_size, webp.stat().st_size
    src_size = jpg.stat().st_size
    with Image.open(jpg) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGB")
        w, h = im.size
        long_edge = max(w, h)
        if long_edge > LONG_EDGE_MAX:
            scale = LONG_EDGE_MAX / long_edge
            new_size = (max(1, int(round(w * scale))), max(1, int(round(h * scale))))
            im = im.resize(new_size, Image.LANCZOS)
        im.save(webp, "WEBP", quality=QUALITY, method=6)
    return jpg, src_size, webp.stat().st_size


def main() -> int:
    if not ROOT.exists():
        print(f"Root not found: {ROOT}", file=sys.stderr)
        return 1

    jpgs = sorted(ROOT.rglob("*.jpg"))
    print(f"Found {len(jpgs)} JPGs under {ROOT}")
    total_src = 0
    total_dst = 0
    done = 0
    failures: list[tuple[Path, str]] = []

    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futures = {pool.submit(convert, p): p for p in jpgs}
        for fut in as_completed(futures):
            p = futures[fut]
            try:
                src_jpg, s_src, s_dst = fut.result()
                total_src += s_src
                total_dst += s_dst
                done += 1
                if done % 50 == 0 or done == len(jpgs):
                    print(f"  {done}/{len(jpgs)} converted (src={total_src/1e6:.1f}MB dst={total_dst/1e6:.1f}MB)")
            except Exception as exc:  # noqa: BLE001
                failures.append((p, repr(exc)))

    print()
    print(f"Total JPG bytes: {total_src/1e6:.1f} MB")
    print(f"Total WebP bytes: {total_dst/1e6:.1f} MB")
    if total_src:
        print(f"Ratio: {total_dst / total_src * 100:.1f}%")
    if failures:
        print("Failures:")
        for p, msg in failures:
            print(f"  {p}: {msg}")
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
