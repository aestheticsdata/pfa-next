module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        login: "0 1px 5px 1px rgb(150, 150, 150)",
        dashboard: "1px 4px 21px 6px rgba(0,0,0,0.54)",
        charttooltip: "0 1px 10px 1px rgba(100, 100, 100, 0.6)",
      },
      fontSize: {
        "xxs": ".7rem",
        "tiny": ".5rem",
      },
      fontFamily: {
        smooch: ["Smooch Sans", "sans-serif"], // imported in styles/global.css
        poppins: ["Poppins", "sans-serif"],
        ubuntu: ["Ubuntu", "sans-serif"],
      },
      colors: {
        spendingDayBackground: "rgb(255, 255, 255)",
        grey0: "rgb(227,227,227)",
        grey01: "rgb(200, 200, 200)",
        grey01alpha: "rgba(200, 200, 200, .1)",
        grey1: "rgb(161,161,161)",
        grey2: "rgb(110, 110, 110)",
        grey3: "rgb(60, 60, 60)",
        grey4: "rgb(40, 40, 40)",
        formsGlobalColor: "rgb(73,73,73)",
        formsGlobalColorHover: "rgb(12,12,12)",
        blueNavy: "rgb(59, 71, 85)",
        calendarBackground: "rgb(42, 42, 42)",
        addSpending: "rgb(26,58,12)",
        addSpendingHover: "rgb(58,172,249)",
        spendingItemHover: "rgb(165, 236, 255)",
        spendingActionHover: "rgb(42,112,164)",
        initialAmountWeekly: "rgb(155, 220, 255)",
        initialAmount: "rgb(44, 129, 212)",
        initialAmountAlpha: "rgba(24, 109, 192, .1)",
        initialAmountHover: "rgb(248,255,38)",
        remainingAmount: "rgb(133, 136, 92)",
        remainingAmountAlpha: "rgba(133, 136, 92, .1)",
        monthTotalAmount: "rgb(255,172,10)",
        monthTotalAmountAlpha: "rgb(255,172,10, .1)",
        warningDelete: "rgb(247, 8, 8)",
        generalWarning: "rgb(247, 8, 8)",
        generalWarningBackground: "rgb(255,255,0)",
        warningDeleteBackground: "rgb(255, 235, 59)",
        warningNoCurrenciesRates: "rgb(255,16,14)",
        generalOK: "rgb(46,179,46)",
        ceilingOK: "rgb(46,179,46)",
        ceilingWarn: "rgb(250,136,73)",
        ceilingExcess: "rgb(247, 8, 8)",
        datePickerWrapper: "rgb(83, 255, 131)",
        datePickerWrapperBackground: "rgb(74, 107, 109)",
        categoryBorder: "rgba(152, 152, 152, 0.5)",
        sortbutton: "rgb(199,199,199)",
        sortButtonHover: "rgb(7,93,193)",
        sortButtonHoverActive: "rgba(7,93,193, .2)",
        invoiceImageIsPresent: "rgb(4,192,86)",
        invoiceImageIsPresentHover: "rgb(13,115,58)",
        invoiceFileModalBackground: "rgba(110, 110, 110, .85)",
        tooltipChartsBackground: "rgba(29, 29, 29, 0.9)",
      },
    },
  },
  plugins: [],
};
