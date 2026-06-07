#!/usr/bin/env python3
"""Generate cover thumbnails for the dorm-supplies WebPs.

For each product, takes the first image (01.webp) and emits a downscaled
WebP at width 500px to assets/img/dorm-supplies-thumbs/<sectionKey>/<productKey>/cover.webp.
Thumbnails are q=72 — small enough to load instantly, sharp enough on a 2x
display card.

Re-runnable: skips files that already exist with a fresh-enough mtime.
"""
from __future__ import annotations

import sys
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

from PIL import Image, ImageFile, ImageOps

ImageFile.LOAD_TRUNCATED_IMAGES = True

ROOT = Path(__file__).resolve().parent.parent
SRC_ROOT = ROOT / "assets" / "img" / "dorm-supplies"
DST_ROOT = ROOT / "assets" / "img" / "dorm-supplies-thumbs"
THUMB_WIDTH = 500
QUALITY = 72
WORKERS = 8


def find_products() -> list[tuple[Path, Path]]:
    """Return [(source_first_webp, dest_cover_webp), ...] for every product."""
    pairs: list[tuple[Path, Path]] = []
    if not SRC_ROOT.exists():
        return pairs
    for section_dir in sorted(SRC_ROOT.iterdir()):
        if not section_dir.is_dir():
            continue
        for product_dir in sorted(section_dir.iterdir()):
            if not product_dir.is_dir():
                continue
            # Pick the smallest-numbered webp as the cover.
            webps = sorted(product_dir.glob("*.webp"))
            if not webps:
                continue
            cover_src = webps[0]
            cover_dst = (
                DST_ROOT
                / section_dir.name
                / product_dir.name
                / "cover.webp"
            )
            pairs.append((cover_src, cover_dst))
    return pairs


def make_thumb(src: Path, dst: Path) -> tuple[Path, int]:
    if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
        return dst, dst.stat().st_size
    dst.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        if im.mode not in ("RGB", "RGBA"):
            im = im.convert("RGB")
        w, h = im.size
        if w > THUMB_WIDTH:
            scale = THUMB_WIDTH / w
            im = im.resize((THUMB_WIDTH, max(1, int(round(h * scale)))), Image.LANCZOS)
        im.save(dst, "WEBP", quality=QUALITY, method=6)
    return dst, dst.stat().st_size


def main() -> int:
    pairs = find_products()
    print(f"Products to thumbnail: {len(pairs)}")
    if not pairs:
        return 0
    total = 0
    done = 0
    failures: list[tuple[Path, str]] = []
    with ThreadPoolExecutor(max_workers=WORKERS) as pool:
        futs = {pool.submit(make_thumb, s, d): (s, d) for s, d in pairs}
        for fut in as_completed(futs):
            s, d = futs[fut]
            try:
                _, size = fut.result()
                total += size
                done += 1
                if done % 20 == 0 or done == len(pairs):
                    print(f"  {done}/{len(pairs)} (cum={total/1e6:.2f} MB)")
            except Exception as exc:  # noqa: BLE001
                failures.append((s, repr(exc)))
    print()
    print(f"Total thumbs: {len(pairs) - len(failures)}")
    print(f"Total thumb bytes: {total/1e6:.2f} MB")
    if failures:
        print("Failures:")
        for p, msg in failures:
            print(f"  {p}: {msg}")
        return 2
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
