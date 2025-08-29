if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  const _imports_0 = "/static/logo.png";
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$3 = {
    data() {
      return {
        title: "Hello"
      };
    },
    onLoad() {
    },
    methods: {}
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { class: "content" }, [
      vue.createElementVNode("image", {
        class: "logo",
        src: _imports_0
      }),
      vue.createElementVNode("view", { class: "text-area" }, [
        vue.createElementVNode(
          "text",
          { class: "title" },
          vue.toDisplayString($data.title),
          1
          /* TEXT */
        )
      ])
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$2], ["__file", "E:/Go/DayCost-uniapp/pages/index/index.vue"]]);
  const _sfc_main$2 = vue.defineComponent({
    setup() {
      return {};
    }
  });
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, " login ");
  }
  const PagesLoginLogin = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$1], ["__file", "E:/Go/DayCost-uniapp/pages/login/login.vue"]]);
  const _sfc_main$1 = {
    data() {
      return {
        amount: "",
        remark: "",
        msg: ""
      };
    },
    methods: {
      addExpense() {
        const url = "http://192.168.0.105:8080/api/expenses/";
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6IjEiLCJpc3MiOiJEYXlDb3N0IiwiZXhwIjoxNzU2NTcwNzAxLCJuYmYiOjE3NTY0ODQzMDEsImlhdCI6MTc1NjQ4NDMwMX0.p9YeK-GPmyZQn6Jn6KIsalTf3iVK5FmDlqba1E_4AU8";
        uni.request({
          url,
          method: "POST",
          header: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
          },
          data: {
            "note": "牛肉睡觉",
            "amount": 5.8,
            "remarks": "[晚餐,拼好饭,自取]，还可以，没有饺子汤",
            "expense_date": "2025-8-30",
            "category": 1
          },
          success: (res) => {
            var _a;
            if (res.statusCode === 200) {
              this.msg = "添加成功！";
              this.amount = "";
              this.remark = "";
            } else {
              this.msg = "添加失败：" + (((_a = res.data) == null ? void 0 : _a.msg) || res.errMsg);
            }
          },
          fail: (err) => {
            this.msg = "请求错误：" + err.errMsg;
          }
        });
      }
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", { style: { "padding": "24rpx" } }, [
      vue.createElementVNode("view", { style: { "margin-bottom": "16rpx" } }, [
        vue.createElementVNode("text", null, "金额："),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => $data.amount = $event),
            type: "number",
            placeholder: "请输入消费金额"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.amount]
        ])
      ]),
      vue.createElementVNode("view", { style: { "margin-bottom": "16rpx" } }, [
        vue.createElementVNode("text", null, "备注："),
        vue.withDirectives(vue.createElementVNode(
          "input",
          {
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => $data.remark = $event),
            placeholder: "请输入备注"
          },
          null,
          512
          /* NEED_PATCH */
        ), [
          [vue.vModelText, $data.remark]
        ])
      ]),
      vue.createElementVNode("button", {
        type: "primary",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.addExpense && $options.addExpense(...args))
      }, "添加消费"),
      $data.msg ? (vue.openBlock(), vue.createElementBlock(
        "view",
        {
          key: 0,
          style: { "margin-top": "24rpx", "color": "green" }
        },
        vue.toDisplayString($data.msg),
        1
        /* TEXT */
      )) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesExpenseExpenseAdd = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render], ["__file", "E:/Go/DayCost-uniapp/pages/expense/expense_add.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  __definePage("pages/login/login", PagesLoginLogin);
  __definePage("pages/expense/expense_add", PagesExpenseExpenseAdd);
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _sfc_main = {
    onLaunch: function() {
      formatAppLog("log", "at App.vue:4", "App Launch");
    },
    onShow: function() {
      formatAppLog("log", "at App.vue:7", "App Show");
    },
    onHide: function() {
      formatAppLog("log", "at App.vue:10", "App Hide");
    }
  };
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "E:/Go/DayCost-uniapp/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
