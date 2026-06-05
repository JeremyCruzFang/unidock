/* UniDock — Campus Mobile Plan data
   First batch of campus SIM card plans. Bilingual fields are included so each
   plan can be rendered in zh / en without re-translating at render time.
   Stage 2 fields are placeholders kept here so the schema does not need to
   change when shipping verified shipping / restriction / source data later. */

(function () {
  const PLACEHOLDER_ZH = "待确认";
  const PLACEHOLDER_EN = "To be confirmed";

  const mobilePlans = [
    {
      id: "cmcc-mango-60",
      nameZh: "60 元芒果卡套餐",
      nameEn: "60 CNY Mango Card Plan",
      carrierZh: "中国移动",
      carrierEn: "China Mobile",
      monthlyFee: 60,
      currency: "CNY",
      tagsZh: ["高流量", "含会员权益", "首充优惠", "活动期免费"],
      tagsEn: ["High Data", "Includes Membership", "Recharge Bonus", "Free During Promo"],

      activity: {
        freePeriodZh: "4-8 月共 5 个月免费使用",
        freePeriodEn: "Free use for 5 months from April to August",
        handlingTimeZh: "办理约需 10 分钟",
        handlingTimeEn: "About 10 minutes to apply",
        serviceModeZh: "支持在校内宿舍区或指定地点线下办理",
        serviceModeEn: "Offline application is available in campus dorm areas or designated locations",
        noteZh: "规则以实际办理为准",
        noteEn: "Final terms subject to actual application page"
      },

      specs: {
        generalDataZh: "每月 150G 基础流量",
        generalDataEn: "150GB base data per month",
        extraDataZh: "可额外赠送 100G",
        extraDataEn: "Up to 100GB extra data",
        totalDataZh: "合计最高 250G 全国通用流量",
        totalDataEn: "Up to 250GB nationwide data in total",
        membershipZh: "自带免费芒果 TV 会员",
        membershipEn: "Includes free Mango TV membership",
        rechargeBonusZh: "首充 100 元，到手 200 元话费",
        rechargeBonusEn: "First recharge 100 CNY, receive 200 CNY balance",
        balanceValidityZh: "100 元可用到明年 3 月底",
        balanceValidityEn: "100 CNY balance valid until end of next March",
        callMinutesZh: PLACEHOLDER_ZH,
        callMinutesEn: PLACEHOLDER_EN,
        contractPeriodZh: PLACEHOLDER_ZH,
        contractPeriodEn: PLACEHOLDER_EN,
        activationMethodZh: PLACEHOLDER_ZH,
        activationMethodEn: PLACEHOLDER_EN
      },

      monthlyBenefits: {
        titleZh: "每月 3 选 1 福利",
        titleEn: "Pick 1 of 3 monthly benefits",
        options: [
          {
            labelZh: "微信提现 20 元红包",
            labelEn: "20 CNY WeChat cash-out",
            detailZh: "宣传资料说明：实际月租约 40 元 / 月；4-8 月免费使用期间每月还能额外领 20 元；宣传资料说明合计可省约 400 元话费",
            detailEn: "Promo materials note: effective monthly fee about 40 CNY; during the free April–August window users can claim 20 CNY each month; promo materials note about 400 CNY total savings"
          },
          {
            labelZh: "学校食堂 / 超市 20 元优惠券",
            labelEn: "20 CNY campus canteen / store voucher"
          },
          {
            labelZh: "视频 / 音乐会员任选",
            labelEn: "Choose any video / music membership",
            detailZh: "示例：腾讯视频、爱奇艺、网易云音乐等",
            detailEn: "Examples: Tencent Video, iQIYI, NetEase Cloud Music, etc."
          }
        ]
      },

      highlightsZh: [
        "每月 150G 基础流量，可叠加最高 250G 全国通用",
        "首充 100 元到手 200 元，话费可用到明年 3 月底",
        "每月 3 选 1 福利：微信红包 / 食堂超市券 / 视频音乐会员",
        "4-8 月 5 个月免费使用",
        "自带免费芒果 TV 会员"
      ],
      highlightsEn: [
        "150GB base data per month, stackable up to 250GB nationwide",
        "Recharge 100 CNY, get 200 CNY balance valid through next March",
        "Pick 1 of 3 monthly benefits: WeChat cash-out / campus voucher / video-music membership",
        "Free use across the 5 months from April to August",
        "Free Mango TV membership included"
      ],
      noticesZh: [
        "通话分钟数、合约期、激活方式、注销方式以实际办理说明为准",
        "发货地区、限制地区、是否需要本人到场以实际办理说明为准",
        "校园流量与全国通用流量的最终适用规则以实际办理说明为准"
      ],
      noticesEn: [
        "Call minutes, contract period, activation, and cancellation methods are subject to the actual application page",
        "Shipping regions, restricted regions, and in-person requirements are subject to the actual application page",
        "Final rules around campus-only vs. nationwide data are subject to the actual application page"
      ],

      stage2Fields: {
        shippingRegions: [],
        restrictedRegions: [],
        eligibilityRules: [],
        sourceSystemId: "cmcc-mango-60",
        lastVerifiedAt: ""
      }
    },

    {
      id: "cmcc-smart-40",
      nameZh: "40 元智享卡套餐",
      nameEn: "40 CNY Smart Card Plan",
      carrierZh: "中国移动",
      carrierEn: "China Mobile",
      monthlyFee: 40,
      currency: "CNY",
      tagsZh: ["低月费", "全国通用流量", "首充优惠", "活动期免费"],
      tagsEn: ["Lower Monthly Fee", "Nationwide Data", "Recharge Bonus", "Free During Promo"],

      activity: {
        freePeriodZh: "4-8 月共 5 个月免费使用",
        freePeriodEn: "Free use for 5 months from April to August",
        handlingTimeZh: "办理约需 10 分钟",
        handlingTimeEn: "About 10 minutes to apply",
        serviceModeZh: "支持在校内宿舍区或指定地点线下办理",
        serviceModeEn: "Offline application is available in campus dorm areas or designated locations",
        noteZh: "规则以实际办理为准",
        noteEn: "Final terms subject to actual application page"
      },

      specs: {
        generalDataZh: "每月 80G 全国通用流量",
        generalDataEn: "80GB nationwide data per month",
        rechargeBonusZh: "首充 100 元，到手 200 元话费",
        rechargeBonusEn: "First recharge 100 CNY, receive 200 CNY balance",
        balanceValidityZh: "100 元可用到明年 1 月底",
        balanceValidityEn: "100 CNY balance valid until end of next January",
        callMinutesZh: PLACEHOLDER_ZH,
        callMinutesEn: PLACEHOLDER_EN,
        membershipZh: PLACEHOLDER_ZH,
        membershipEn: PLACEHOLDER_EN,
        contractPeriodZh: PLACEHOLDER_ZH,
        contractPeriodEn: PLACEHOLDER_EN,
        activationMethodZh: PLACEHOLDER_ZH,
        activationMethodEn: PLACEHOLDER_EN
      },

      highlightsZh: [
        "每月 80G 全国通用流量",
        "首充 100 元到手 200 元，话费可用到明年 1 月底",
        "4-8 月 5 个月免费使用"
      ],
      highlightsEn: [
        "80GB nationwide data per month",
        "Recharge 100 CNY, get 200 CNY balance valid through next January",
        "Free use across the 5 months from April to August"
      ],
      noticesZh: [
        "通话分钟数、会员权益、合约期、激活方式、注销方式以实际办理说明为准",
        "发货地区、限制地区、是否需要本人到场以实际办理说明为准"
      ],
      noticesEn: [
        "Call minutes, membership benefits, contract period, activation, and cancellation methods are subject to the actual application page",
        "Shipping regions, restricted regions, and in-person requirements are subject to the actual application page"
      ],

      stage2Fields: {
        shippingRegions: [],
        restrictedRegions: [],
        eligibilityRules: [],
        sourceSystemId: "cmcc-smart-40",
        lastVerifiedAt: ""
      }
    }
  ];

  window.UniDockMobilePlans = {
    plans: mobilePlans,
    placeholderZh: PLACEHOLDER_ZH,
    placeholderEn: PLACEHOLDER_EN
  };
})();
