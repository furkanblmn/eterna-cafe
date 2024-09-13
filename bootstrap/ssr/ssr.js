import { useSSRContext, mergeProps, resolveComponent, withCtx, createTextVNode, createVNode, toDisplayString, createSSRApp, h } from "vue";
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
import axios from "axios";
import InputText from "primevue/inputtext";
import FileUpload from "primevue/fileupload";
import dayjs from "dayjs";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import "@inertiajs/inertia";
import Editor from "primevue/editor";
import MultiSelect from "primevue/multiselect";
import InputNumber from "primevue/inputnumber";
import { renderToString } from "@vue/server-renderer";
import { createInertiaApp } from "@inertiajs/vue3";
import createServer from "@inertiajs/vue3/server";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$c = {
  props: {
    loading: Boolean,
    type: {
      type: String,
      default: "button"
      // Varsayılan olarak button, formdan submit ile değiştirilebilir.
    },
    buttonClass: {
      type: String,
      default: ""
    }
  }
};
function _sfc_ssrRender$c(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<button${ssrRenderAttrs(mergeProps({
    disabled: $props.loading,
    type: $props.type,
    class: ["form-control", $props.buttonClass]
  }, _attrs))}>`);
  if ($props.loading) {
    _push(`<div class="spinner-grow spinner-grow-sm" role="status"><span class="visually-hidden">Yükleniyor</span></div>`);
  } else {
    _push(`<!---->`);
  }
  if (!$props.loading) {
    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  } else {
    _push(`<!---->`);
  }
  _push(`</button>`);
}
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/LoadingButton.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const LoadingButton = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$c]]);
const _sfc_main$b = {
  components: {
    LoadingButton
  },
  data() {
    return {
      form: {
        email: "",
        password: ""
      },
      processing: false
    };
  },
  methods: {
    login() {
      this.processing = true;
      axios.post("/login", this.form).then((response) => {
        this.$inertia.visit("/dashboard");
      }).catch((error) => {
        let message = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Bilinmeyen bir hata oluştu.";
        console.error("Form gönderilirken bir hata oluştu:", message);
        this.$showAlert(message, "error");
      }).finally(() => {
        this.loader = false;
      });
    }
  }
};
function _sfc_ssrRender$b(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_LoadingButton = resolveComponent("LoadingButton");
  const _component_Link = resolveComponent("Link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-wrapper background_blue d-flex align-items-center justify-content-center" }, _attrs))}><div class="background-image"><img src="https://picsum.photos/1920/1080" alt=""></div><div class="form-container"><h2 class="form-title">Giriş Yap</h2><form class="form-body"><div class="form-group"><label for="email">Email:</label><input type="email" id="email"${ssrRenderAttr("value", $data.form.email)} class="form-input" required></div><div class="form-group"><label for="password">Şifre:</label><input type="password" id="password"${ssrRenderAttr("value", $data.form.password)} class="form-input" required></div>`);
  _push(ssrRenderComponent(_component_LoadingButton, {
    type: "submit",
    loading: $data.processing,
    class: "btn btn-primary form-button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Giriş Yap`);
      } else {
        return [
          createTextVNode(" Giriş Yap")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</form><div class="login-link mt-3"> Bir hesabın yok mu? `);
  _push(ssrRenderComponent(_component_Link, { href: "/register" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Kayıt ol`);
      } else {
        return [
          createTextVNode("Kayıt ol")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Login.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const Login = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$b]]);
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Login
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$a = {
  components: {
    LoadingButton
  },
  data() {
    return {
      form: {
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: ""
      },
      processing: false,
      successMessage: "",
      errorMessage: "",
      icon: "success"
    };
  },
  methods: {
    register() {
      this.processing = true;
      axios.post("/register", this.form).then((response) => {
        this.message = response.data.data || "Kayıt başarılı!";
        setTimeout(() => {
          this.$inertia.visit("/login");
        }, 3e3);
      }).catch((error) => {
        this.icon = "error";
        if (error.response && error.response.data) {
          this.message = error.response.data.message || "Kayıt işlemi sırasında bir hata oluştu.";
        } else {
          this.message = "Bir hata oluştu. Lütfen tekrar deneyin.";
        }
      }).finally(() => {
        this.$showAlert(this.message, this.icon);
        this.processing = false;
      });
    }
  }
};
function _sfc_ssrRender$a(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_LoadingButton = resolveComponent("LoadingButton");
  const _component_Link = resolveComponent("Link");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "form-wrapper background_blue d-flex align-items-center justify-content-center" }, _attrs))}><div class="background-image"><img src="https://picsum.photos/1920/1080" alt=""></div><div class="form-container"><h2 class="form-title">Kayıt Ol</h2><form class="form-body"><div class="form-group"><label for="first_name">İsim:</label><input type="text" id="first_name"${ssrRenderAttr("value", $data.form.first_name)} class="form-input" required></div><div class="form-group"><label for="last_name">Soyisim:</label><input type="text" id="last_name"${ssrRenderAttr("value", $data.form.last_name)} class="form-input" required></div><div class="form-group"><label for="username">Kullanıcı Adı:</label><input type="text" id="username"${ssrRenderAttr("value", $data.form.username)} class="form-input" required></div><div class="form-group"><label for="email">Email:</label><input type="email" id="email"${ssrRenderAttr("value", $data.form.email)} class="form-input" required></div><div class="form-group"><label for="password">Şifre:</label><input type="password" id="password"${ssrRenderAttr("value", $data.form.password)} class="form-input" required></div>`);
  _push(ssrRenderComponent(_component_LoadingButton, {
    type: "submit",
    loading: $data.processing,
    class: "btn btn-primary form-button"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Kayıt Ol`);
      } else {
        return [
          createTextVNode(" Kayıt Ol")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</form><div class="login-link mt-3"> Zaten hesabınız var mı? `);
  _push(ssrRenderComponent(_component_Link, { href: "/login" }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Giriş Yapın`);
      } else {
        return [
          createTextVNode("Giriş Yapın")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Auth/Register.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const Register = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["ssrRender", _sfc_ssrRender$a]]);
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Register
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$9 = {
  props: {
    status: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    //
  },
  mounted() {
  }
};
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  _push(`<ul${ssrRenderAttrs(mergeProps({
    class: "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion",
    id: "accordionSidebar"
  }, _attrs))}>`);
  _push(ssrRenderComponent(_component_Link, {
    class: "sidebar-brand d-flex align-items-center justify-content-center",
    href: "/dashboard"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<div class="sidebar-brand-text mx-3"${_scopeId}>YÖNETİM PANELİ</div>`);
      } else {
        return [
          createVNode("div", { class: "sidebar-brand-text mx-3" }, "YÖNETİM PANELİ")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<hr class="sidebar-divider my-0"><li class="nav-item">`);
  _push(ssrRenderComponent(_component_Link, {
    class: "nav-link",
    href: "/dashboard/categories"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span${_scopeId}>Kategoriler</span>`);
      } else {
        return [
          createVNode("span", null, "Kategoriler")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li><li class="nav-item">`);
  _push(ssrRenderComponent(_component_Link, {
    class: "nav-link",
    href: "/dashboard/products"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span${_scopeId}>Ürünler</span>`);
      } else {
        return [
          createVNode("span", null, "Ürünler")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</li></ul>`);
}
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/SideBar.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const SideBar = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender$9]]);
const _sfc_main$8 = {
  components: {
    SideBar
  },
  data() {
    return {
      //
    };
  },
  computed: {
    //
  },
  watch: {
    //
  },
  methods: {
    //
  },
  mounted() {
  }
};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_SideBar = resolveComponent("SideBar");
  _push(`<body${ssrRenderAttrs(mergeProps({ id: "page-top" }, _attrs))}><div id="wrapper">`);
  _push(ssrRenderComponent(_component_SideBar, { status: true }, null, _parent));
  _push(`<div id="content-wrapper" class="d-flex flex-column"><div id="content"><nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow"></nav>`);
  ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div></div></div></body>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Layout.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const Layout = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$8]]);
const _sfc_main$7 = {
  components: {
    LoadingButton
  },
  props: {
    loading: Boolean,
    backUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    goBack() {
      this.$inertia.visit(this.backUrl);
    }
  },
  mounted() {
  }
};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_LoadingButton = resolveComponent("LoadingButton");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card mt-3" }, _attrs))}><div class="card-body"><div class="d-block text-center"><button type="button" class="btn btn-default w-50"><i class="fas fa-arrow-left"></i> Geri Dön </button>`);
  _push(ssrRenderComponent(_component_LoadingButton, {
    loading: $props.loading,
    type: "submit",
    buttonClass: "btn btn-success w-50"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span class="indicator-label"${_scopeId}>Kaydet</span>`);
      } else {
        return [
          createVNode("span", { class: "indicator-label" }, "Kaydet")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/SaveButtonWrapper.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const SaveButtonWrapper = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["ssrRender", _sfc_ssrRender$7]]);
const _sfc_main$6 = {
  components: {
    FileUpload
  },
  props: {
    fileId: {
      type: String,
      required: true
    },
    defaultPreview: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      localDefaultPreview: this.defaultPreview,
      fileUrl: "/dashboard/file"
    };
  },
  methods: {
    beforeSend(event) {
      event.xhr.setRequestHeader("X-CSRF-TOKEN", document.querySelector("#csrf-token").getAttribute("content"));
    },
    onUpload(event) {
      const fileId = event.xhr.response;
      this.$emit("update:fileId", fileId);
    },
    onRemove() {
      axios.delete(`${this.fileUrl}/${this.fileId}`, {
        headers: {
          "X-CSRF-TOKEN": document.querySelector("#csrf-token").getAttribute("content")
        }
      }).then((response) => {
        this.$emit("update:fileId", "");
      });
    },
    removeDefaultPreview() {
      this.localDefaultPreview = "";
      this.$emit("update:fileId", "");
    }
  }
};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_FileUpload = resolveComponent("FileUpload");
  _push(`<div${ssrRenderAttrs(_attrs)} data-v-1406bbab>`);
  if ($data.localDefaultPreview !== "") {
    _push(`<div class="default-preview d-flex flex-column justify-content-center aling-items-center mb-3" data-v-1406bbab><img${ssrRenderAttr("src", $data.localDefaultPreview)} alt="Default Preview" class="img-fluid" data-v-1406bbab><button type="button" class="btn btn-danger mt-2 w-25 mx-auto" data-v-1406bbab>Resmi Kaldır</button></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(ssrRenderComponent(_component_FileUpload, {
    name: "file",
    multiple: false,
    accept: "image/*",
    maxFileSize: 1e6,
    chooseLabel: "Dosya Seç",
    uploadLabel: "Yükle",
    showCancelButton: false,
    showUploadButton: false,
    withCredentials: true,
    auto: true,
    url: $data.fileUrl,
    onBeforeSend: $options.beforeSend,
    onRemoveUploadedFile: $options.onRemove,
    onUpload: $options.onUpload,
    showPreview: true,
    disabled: $props.fileId !== ""
  }, {
    empty: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`<span data-v-1406bbab${_scopeId}>Dosyaları buraya sürükleyip bırakın veya <strong data-v-1406bbab${_scopeId}>Dosya Seç</strong> butonuna tıklayın.</span>`);
      } else {
        return [
          createVNode("span", null, [
            createTextVNode("Dosyaları buraya sürükleyip bırakın veya "),
            createVNode("strong", null, "Dosya Seç"),
            createTextVNode(" butonuna tıklayın.")
          ])
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/FileUploader.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const FileUploader = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$6], ["__scopeId", "data-v-1406bbab"]]);
const _sfc_main$5 = {
  components: {
    FileUploader,
    SaveButtonWrapper,
    InputText
  },
  data() {
    return {
      form: {
        title: "",
        file_id: ""
      },
      loader: false,
      message: "",
      icon: "success"
    };
  },
  props: {
    category: {
      type: Object,
      required: false
    }
  },
  mounted() {
    if (this.category) {
      this.form.title = this.category.title;
      this.form.file_id = this.category.file_id;
    }
  },
  methods: {
    formSubmit() {
      this.loader = true;
      const requestType = this.category ? "put" : "post";
      const url = this.category ? `/dashboard/categories/${this.category.id}` : "/dashboard/categories";
      axios[requestType](url, this.form).then((response) => {
        this.message = response.data.data.message;
        this.icon = "success";
        if (!this.category) {
          this.resetForm();
        }
      }).catch((error) => {
        console.log(error);
        this.message = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Bilinmeyen bir hata oluştu.";
        this.icon = "error";
      }).finally(() => {
        this.$showAlert(this.message, this.icon);
        this.loader = false;
      });
    },
    resetForm() {
      this.form = {
        title: "",
        file_id: ""
      };
    },
    updateFileId(newFileId) {
      this.form.file_id = newFileId;
    }
  },
  layout: Layout
};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_InputText = resolveComponent("InputText");
  const _component_FileUploader = resolveComponent("FileUploader");
  const _component_SaveButtonWrapper = resolveComponent("SaveButtonWrapper");
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "content",
    class: "w-100"
  }, _attrs))}><div class="container-fluid"><div class="card shadow mt-4 w-100"><form id="form" class="form-body"><div class="card-body"><div class="row"><div class="col-lg-8"><div class="card"><div class="card-body"><div class="row mb-4 align-items-center"><label class="text-end form-label mb-0 col-lg-3">Başlık</label><div class="col-lg-9">`);
  _push(ssrRenderComponent(_component_InputText, {
    placeholder: "Başlık girin",
    type: "text",
    modelValue: $data.form.title,
    "onUpdate:modelValue": ($event) => $data.form.title = $event,
    class: "w-100"
  }, null, _parent));
  _push(`</div></div></div></div></div><div class="col-lg-4"><div class="card"><div class="card-body">`);
  _push(ssrRenderComponent(_component_FileUploader, {
    defaultPreview: $props.category ? $props.category.file.orj_link : "",
    fileId: $data.form.file_id,
    "onUpdate:fileId": $options.updateFileId
  }, null, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_SaveButtonWrapper, {
    backUrl: "/dashboard/categories",
    loading: $data.loader
  }, null, _parent));
  _push(`</div></div></div></form></div></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Categories/CreateEdit.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const CreateEdit$1 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$5]]);
const __vite_glob_0_2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateEdit$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = {
  components: {
    LoadingButton,
    DataTable,
    Column
  },
  props: {
    items: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sortField: "id",
      sortOrder: 1,
      currentUrl: window.location.href,
      loading: false
    };
  },
  methods: {
    deleteItem(item) {
      this.loading = true;
      axios.delete(`${this.currentUrl}/${item.id}`, {
        headers: {
          "X-CSRF-TOKEN": document.querySelector("#csrf-token").getAttribute("content")
        }
      }).then((response) => {
        this.$showAlert("Silme işlemi başarıyla tamamlandı", "success");
        const index = this.items.findIndex((i) => i.id === item.id);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
      }).catch((error) => {
        let message = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Bilinmeyen bir hata oluştu.";
        this.$showAlert(message, "error");
      }).finally(() => {
        this.loading = false;
      });
    },
    updateItem(item) {
      this.$inertia.visit(`${this.currentUrl}/${item.id}/edit`);
    },
    formatDate(time, format = "DD.MM.YYYY HH:mm") {
      const date = dayjs(time);
      if (date.isSame(dayjs(), "day")) {
        return "Bugün";
      }
      return date.format(format);
    },
    onSort(event) {
      this.sortField = event.sortField;
      this.sortOrder = event.sortOrder;
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_DataTable = resolveComponent("DataTable");
  const _component_Column = resolveComponent("Column");
  const _component_LoadingButton = resolveComponent("LoadingButton");
  _push(ssrRenderComponent(_component_DataTable, mergeProps({
    value: $props.items,
    tableStyle: "min-width: 50rem",
    paginator: "",
    rows: 10,
    rowsPerPageOptions: [10, 20, 50],
    sortOrder: $data.sortOrder,
    onSort: $options.onSort
  }, _attrs), {
    footer: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(` Toplam ${ssrInterpolate($props.items ? $props.items.length : 0)} kayıt. `);
      } else {
        return [
          createTextVNode(" Toplam " + toDisplayString($props.items ? $props.items.length : 0) + " kayıt. ", 1)
        ];
      }
    }),
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_Column, {
          field: "id",
          header: "ID"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_Column, {
          field: "title",
          header: "BAŞLIK"
        }, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_Column, {
          field: "title",
          header: "RESİM"
        }, {
          body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<img${ssrRenderAttr("src", slotProps.data.file.orj_link)} class="w-24 rounded" style="${ssrRenderStyle({ "height": "60px" })}" data-v-ee7f329c${_scopeId2}>`);
            } else {
              return [
                createVNode("img", {
                  src: slotProps.data.file.orj_link,
                  class: "w-24 rounded",
                  style: { "height": "60px" }
                }, null, 8, ["src"])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_Column, { header: "İŞLEMLER" }, {
          body: withCtx((slotProps, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(`<span data-v-ee7f329c${_scopeId2}>`);
              _push3(ssrRenderComponent(_component_LoadingButton, {
                onClick: ($event) => $options.deleteItem(slotProps.data),
                loading: $data.loading,
                buttonClass: "btn btn-danger me-3 process_btn"
              }, {
                default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<span class="indicator-label" data-v-ee7f329c${_scopeId3}>Sil</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "indicator-label" }, "Sil")
                    ];
                  }
                }),
                _: 2
              }, _parent3, _scopeId2));
              _push3(ssrRenderComponent(_component_LoadingButton, {
                onClick: ($event) => $options.updateItem(slotProps.data),
                loading: $data.loading,
                buttonClass: "btn btn-primary process_btn"
              }, {
                default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(`<span class="indicator-label" data-v-ee7f329c${_scopeId3}>Düzenle</span>`);
                  } else {
                    return [
                      createVNode("span", { class: "indicator-label" }, "Düzenle")
                    ];
                  }
                }),
                _: 2
              }, _parent3, _scopeId2));
              _push3(`</span>`);
            } else {
              return [
                createVNode("span", null, [
                  createVNode(_component_LoadingButton, {
                    onClick: ($event) => $options.deleteItem(slotProps.data),
                    loading: $data.loading,
                    buttonClass: "btn btn-danger me-3 process_btn"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "indicator-label" }, "Sil")
                    ]),
                    _: 2
                  }, 1032, ["onClick", "loading"]),
                  createVNode(_component_LoadingButton, {
                    onClick: ($event) => $options.updateItem(slotProps.data),
                    loading: $data.loading,
                    buttonClass: "btn btn-primary process_btn"
                  }, {
                    default: withCtx(() => [
                      createVNode("span", { class: "indicator-label" }, "Düzenle")
                    ]),
                    _: 2
                  }, 1032, ["onClick", "loading"])
                ])
              ];
            }
          }),
          _: 1
        }, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_Column, {
            field: "id",
            header: "ID"
          }),
          createVNode(_component_Column, {
            field: "title",
            header: "BAŞLIK"
          }),
          createVNode(_component_Column, {
            field: "title",
            header: "RESİM"
          }, {
            body: withCtx((slotProps) => [
              createVNode("img", {
                src: slotProps.data.file.orj_link,
                class: "w-24 rounded",
                style: { "height": "60px" }
              }, null, 8, ["src"])
            ]),
            _: 1
          }),
          createVNode(_component_Column, { header: "İŞLEMLER" }, {
            body: withCtx((slotProps) => [
              createVNode("span", null, [
                createVNode(_component_LoadingButton, {
                  onClick: ($event) => $options.deleteItem(slotProps.data),
                  loading: $data.loading,
                  buttonClass: "btn btn-danger me-3 process_btn"
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "indicator-label" }, "Sil")
                  ]),
                  _: 2
                }, 1032, ["onClick", "loading"]),
                createVNode(_component_LoadingButton, {
                  onClick: ($event) => $options.updateItem(slotProps.data),
                  loading: $data.loading,
                  buttonClass: "btn btn-primary process_btn"
                }, {
                  default: withCtx(() => [
                    createVNode("span", { class: "indicator-label" }, "Düzenle")
                  ]),
                  _: 2
                }, 1032, ["onClick", "loading"])
              ])
            ]),
            _: 1
          })
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Shared/Table.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const Table = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-ee7f329c"]]);
const _sfc_main$3 = {
  components: {
    Table
  },
  data() {
    return {
      //
    };
  },
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  layout: Layout
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  const _component_Table = resolveComponent("Table");
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "content",
    class: "w-100"
  }, _attrs))}><div class="container-fluid"><div class="card shadow mt-4 w-100"><div class="card-header"><div class="d-flex justify-content-end ms-auto col-12">`);
  _push(ssrRenderComponent(_component_Link, {
    href: "categories/create",
    class: "btn btn-success"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Yeni ekle`);
      } else {
        return [
          createTextVNode("Yeni ekle")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="card-body">`);
  _push(ssrRenderComponent(_component_Table, { items: $props.categories }, null, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Categories/Index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Index$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$3]]);
const __vite_glob_0_3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  data() {
    return {
      form: {
        email: "",
        password: ""
      }
    };
  },
  layout: Layout,
  methods: {}
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Head = resolveComponent("Head");
  _push(ssrRenderComponent(_component_Head, mergeProps({ title: "Yönetim Paneli" }, _attrs), null, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Dashboard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Dashboard = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const __vite_glob_0_4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Dashboard
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  components: {
    FileUploader,
    SaveButtonWrapper,
    InputText,
    Editor,
    MultiSelect,
    InputNumber
  },
  data() {
    return {
      form: {
        title: "",
        content: "",
        file_id: "",
        price: "",
        categories: []
      },
      loader: false,
      message: "",
      icon: "success"
    };
  },
  props: {
    product: {
      type: Object,
      required: false
    },
    categories: {
      type: Array,
      // Kategoriler listesi
      required: true
    }
  },
  mounted() {
    if (this.product) {
      this.loadProductData();
    }
  },
  watch: {
    product: {
      handler(newValue) {
        if (newValue) {
          this.loadProductData();
        }
      },
      immediate: true
    }
  },
  methods: {
    initEditorValue({ instance }) {
      instance.setContents(instance.clipboard.convert({
        html: this.form.content
      }));
    },
    loadProductData() {
      this.form.title = this.product.title;
      this.form.content = this.product.content;
      this.form.file_id = this.product.file_id;
      this.form.price = this.product.price;
      this.form.categories = this.product.categories.map((category) => category.id);
    },
    formSubmit() {
      this.loader = true;
      const requestType = this.product ? "put" : "post";
      const url = this.product ? `/dashboard/products/${this.product.id}` : "/dashboard/products";
      axios[requestType](url, this.form).then((response) => {
        this.message = response.data.data.message;
        this.icon = "success";
        if (!this.product) {
          this.resetForm();
        }
      }).catch((error) => {
        console.log(error);
        this.message = error.response && error.response.data && error.response.data.message ? error.response.data.message : "Bilinmeyen bir hata oluştu.";
        this.icon = "error";
      }).finally(() => {
        this.$showAlert(this.message, this.icon);
        this.loader = false;
      });
    },
    resetForm() {
      this.form = {
        title: "",
        content: "",
        file_id: "",
        price: "",
        categories: []
      };
    },
    updateFileId(newFileId) {
      this.form.file_id = newFileId;
    }
  },
  layout: Layout
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_InputText = resolveComponent("InputText");
  const _component_MultiSelect = resolveComponent("MultiSelect");
  const _component_InputNumber = resolveComponent("InputNumber");
  const _component_Editor = resolveComponent("Editor");
  const _component_FileUploader = resolveComponent("FileUploader");
  const _component_SaveButtonWrapper = resolveComponent("SaveButtonWrapper");
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "content",
    class: "w-100"
  }, _attrs))}><div class="container-fluid"><div class="card shadow mt-4 w-100"><form id="form" class="form-body"><div class="card-body"><div class="row"><div class="col-lg-8"><div class="card"><div class="card-body"><div class="row mb-4 align-items-center"><label class="text-end form-label mb-0 col-lg-3">Başlık</label><div class="col-lg-9">`);
  _push(ssrRenderComponent(_component_InputText, {
    placeholder: "Başlık girin",
    type: "text",
    modelValue: $data.form.title,
    "onUpdate:modelValue": ($event) => $data.form.title = $event,
    class: "w-100"
  }, null, _parent));
  _push(`</div></div><div class="row mb-4 align-items-center"><label class="text-end form-label mb-0 col-lg-3">Kategoriler</label><div class="col-lg-9">`);
  _push(ssrRenderComponent(_component_MultiSelect, {
    modelValue: $data.form.categories,
    "onUpdate:modelValue": ($event) => $data.form.categories = $event,
    options: $props.categories,
    optionLabel: "title",
    optionValue: "id",
    filter: "",
    placeholder: "Kategori Seçin",
    maxSelectedLabels: 20,
    class: "w-100"
  }, null, _parent));
  _push(`</div></div><div class="row mb-4 align-items-center"><label class="text-end form-label mb-0 col-lg-3">Fiyat</label><div class="col-lg-9">`);
  _push(ssrRenderComponent(_component_InputNumber, {
    modelValue: $data.form.price,
    "onUpdate:modelValue": ($event) => $data.form.price = $event,
    inputId: "currency-turkey",
    class: "w-100",
    mode: "currency",
    currency: "TRY",
    locale: "tr-TR",
    placeholder: "Fiyat girin"
  }, null, _parent));
  _push(`</div></div><div class="row mb-4 align-items-start"><label class="text-end form-label mb-0 col-lg-3">İçerik</label><div class="col-lg-9">`);
  _push(ssrRenderComponent(_component_Editor, {
    onLoad: $options.initEditorValue,
    modelValue: $data.form.content,
    "onUpdate:modelValue": ($event) => $data.form.content = $event,
    editorStyle: "height: 320px"
  }, null, _parent));
  _push(`</div></div></div></div></div><div class="col-lg-4"><div class="card"><div class="card-body">`);
  _push(ssrRenderComponent(_component_FileUploader, {
    defaultPreview: $props.product ? $props.product.file.orj_link : "",
    fileId: $data.form.file_id,
    "onUpdate:fileId": $options.updateFileId
  }, null, _parent));
  _push(`</div></div>`);
  _push(ssrRenderComponent(_component_SaveButtonWrapper, {
    backUrl: "/dashboard/products",
    loading: $data.loader
  }, null, _parent));
  _push(`</div></div></div></form></div></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/CreateEdit.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const CreateEdit = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1]]);
const __vite_glob_0_5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: CreateEdit
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  components: {
    Table
  },
  data() {
    return {
      //
    };
  },
  props: {
    products: {
      type: Object,
      required: true
    }
  },
  layout: Layout
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Link = resolveComponent("Link");
  const _component_Table = resolveComponent("Table");
  _push(`<div${ssrRenderAttrs(mergeProps({
    id: "content",
    class: "w-100"
  }, _attrs))}><div class="container-fluid"><div class="card shadow mt-4 w-100"><div class="card-header"><div class="d-flex justify-content-end ms-auto col-12">`);
  _push(ssrRenderComponent(_component_Link, {
    href: "products/create",
    class: "btn btn-success"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`Yeni ekle`);
      } else {
        return [
          createTextVNode("Yeni ekle")
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="card-body">`);
  _push(ssrRenderComponent(_component_Table, { items: $props.products }, null, _parent));
  _push(`</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("resources/js/Pages/Products/Index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const __vite_glob_0_6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index
}, Symbol.toStringTag, { value: "Module" }));
createServer((page) => createInertiaApp({
  page,
  render: renderToString,
  resolve: (name) => {
    const pages = /* @__PURE__ */ Object.assign({ "./Pages/Auth/Login.vue": __vite_glob_0_0, "./Pages/Auth/Register.vue": __vite_glob_0_1, "./Pages/Categories/CreateEdit.vue": __vite_glob_0_2, "./Pages/Categories/Index.vue": __vite_glob_0_3, "./Pages/Dashboard.vue": __vite_glob_0_4, "./Pages/Products/CreateEdit.vue": __vite_glob_0_5, "./Pages/Products/Index.vue": __vite_glob_0_6 });
    return pages[`./Pages/${name}.vue`];
  },
  title: (title) => title ? `${title}` : "Eterna Cafe",
  setup({ app, props, plugin }) {
    return createSSRApp({
      render: () => h(app, props)
    }).use(plugin);
  }
}));
