/*
THIS IS A GENERATED/BUNDLED FILE BY ESBUILD
if you want to view the source, please visit the github repository of this plugin
*/

var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// main.ts
var main_exports = {};
__export(main_exports, {
  default: () => ObsidianNiftyLinksPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {};
var ObsidianNiftyLinksPlugin = class extends import_obsidian.Plugin {
  async onload() {
    console.log("loading plugin");
    await this.loadSettings();
    this.addRibbonIcon("link", "Nifty Links", () => {
      let activeView = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
      if (activeView) {
        let editor = activeView.editor;
        this.urlToMarkdown(editor);
      }
    });
    this.addCommand({
      id: "create-nifty-links",
      name: "Create Nifty Link",
      editorCheckCallback: (checking, editor) => {
        if (!checking) {
          this.urlToMarkdown(editor);
        }
        return true;
      }
    });
    this.registerMarkdownCodeBlockProcessor("NiftyLinks", (source, el, ctx) => {
      const data = source.split("\n").reduce((acc, line) => {
        const [key, ...value] = line.split(": ");
        acc[key.trim()] = value.join(": ").trim();
        return acc;
      }, {});
      const url = data.url;
      let title = data.title || "";
      let description = data.description || "";
      const imageLink = data.image;
      const iconLink = data.favicon;
      title = title.replace(/\s{3,}/g, " ").trim();
      description = description.replace(/\s{3,}/g, " ").trim();
      const cardTextStyle = imageLink ? "" : ' style="width: 100%;"';
      const iconHTML = iconLink ? `<img class="nifty-link-icon" src="${iconLink}">` : "";
      const imageContainerHTML = imageLink ? `
		  <div class="nifty-link-image-container">
			<div class="nifty-link-image" style="background-image: url('${imageLink}')"></div>
		  </div>` : "";
      const html = `
		  <div class="nifty-link-card-container">
			<a class="nifty-link-card" href="${url}" target="_blank">
			  <div class="nifty-link-card-text"${cardTextStyle}>
				<div class="nifty-link-card-title">${title}</div>
				<div class="nifty-link-card-description">${description}</div>
				<div class="nifty-link-href">
				  ${iconHTML}${url}
				</div>
			  </div>
			  ${imageContainerHTML}
			</a>
		  </div>
		`;
      el.innerHTML = html;
    });
  }
  onunload() {
    console.log("unloading plugin");
  }
  isUrl(text) {
    const urlRegex = new RegExp("^(http:\\/\\/www\\.|https:\\/\\/www\\.|http:\\/\\/|https:\\/\\/)?[a-z0-9]+([\\-.]{1}[a-z0-9]+)*\\.[a-z]{2,5}(:[0-9]{1,5})?(\\/.*)?$");
    return urlRegex.test(text);
  }
  async urlToMarkdown(editor) {
    var _a, _b;
    let selectedText = editor.somethingSelected() ? editor.getSelection().trim() : false;
    if (selectedText && this.isUrl(selectedText)) {
      let url = selectedText;
      let api = "";
      const specialDomains = ["medium.com"];
      let isSpecialDomain = specialDomains.some((domain) => url.includes(domain));
      if (isSpecialDomain) {
        api = `https://api.microlink.io/?url=${url}`;
      } else {
        api = `http://iframely.server.crestify.com/iframely?url=${url}`;
      }
      try {
        let response = await (0, import_obsidian.requestUrl)({ url: api });
        let data = isSpecialDomain ? response.json.data : response.json;
        if (!isSpecialDomain && data.code === 403) {
          api = `https://api.microlink.io/?url=${url}`;
          response = await (0, import_obsidian.requestUrl)({ url: api });
          data = response.json.data;
          isSpecialDomain = true;
        }
        const imageLink = isSpecialDomain ? data.image ? data.image.url : "" : ((_a = data.links.find((value) => value.type.startsWith("image") && value.rel.includes("twitter"))) == null ? void 0 : _a.href) || "";
        const iconLink = isSpecialDomain ? data.logo ? data.logo.url : "" : ((_b = data.links.find((value) => value.type.startsWith("image") && value.rel.includes("icon"))) == null ? void 0 : _b.href) || "";
        let markdownLink = `
\`\`\`NiftyLinks
url: ${isSpecialDomain ? data.url || url : url}
title: ${isSpecialDomain ? data.title : data.meta.title || ""}
description: ${isSpecialDomain ? data.description : data.meta.description || ""}
favicon: ${iconLink}
${imageLink ? `image: ${imageLink}` : ""}
\`\`\`
`;
        editor.replaceSelection(markdownLink);
      } catch (error) {
        console.error(error);
        new import_obsidian.Notice("Failed to fetch data.");
      }
    } else {
      new import_obsidian.Notice("Select a URL to convert to nifty link.");
    }
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IHtcclxuXHRBcHAsXHJcblx0RWRpdG9yLFxyXG5cdE1hcmtkb3duVmlldyxcclxuXHROb3RpY2UsXHJcblx0UGx1Z2luLFxyXG5cdHJlcXVlc3RVcmxcclxufSBmcm9tIFwib2JzaWRpYW5cIjtcclxuXHJcbmludGVyZmFjZSBPYnNpZGlhbk5pZnR5TGlua3NQbHVnaW5TZXR0aW5ncyB7IH1cclxuXHJcbmNvbnN0IERFRkFVTFRfU0VUVElOR1M6IE9ic2lkaWFuTmlmdHlMaW5rc1BsdWdpblNldHRpbmdzID0ge307XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPYnNpZGlhbk5pZnR5TGlua3NQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xyXG5cdHNldHRpbmdzOiBPYnNpZGlhbk5pZnR5TGlua3NQbHVnaW5TZXR0aW5ncztcclxuXHJcblx0YXN5bmMgb25sb2FkKCkge1xyXG5cdFx0Y29uc29sZS5sb2coXCJsb2FkaW5nIHBsdWdpblwiKTtcclxuXHJcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xyXG5cclxuXHRcdHRoaXMuYWRkUmliYm9uSWNvbihcImxpbmtcIiwgXCJOaWZ0eSBMaW5rc1wiLCAoKSA9PiB7XHJcblx0XHRcdGxldCBhY3RpdmVWaWV3ID0gdGhpcy5hcHAud29ya3NwYWNlLmdldEFjdGl2ZVZpZXdPZlR5cGUoTWFya2Rvd25WaWV3KTtcclxuXHRcdFx0aWYgKGFjdGl2ZVZpZXcpIHtcclxuXHRcdFx0XHRsZXQgZWRpdG9yID0gYWN0aXZlVmlldy5lZGl0b3I7XHJcblx0XHRcdFx0dGhpcy51cmxUb01hcmtkb3duKGVkaXRvcik7XHJcblx0XHRcdH1cclxuXHRcdH0pO1xyXG5cclxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XHJcblx0XHRcdGlkOiBcImNyZWF0ZS1uaWZ0eS1saW5rc1wiLFxyXG5cdFx0XHRuYW1lOiBcIkNyZWF0ZSBOaWZ0eSBMaW5rXCIsXHJcblx0XHRcdGVkaXRvckNoZWNrQ2FsbGJhY2s6IChjaGVja2luZzogYm9vbGVhbiwgZWRpdG9yOiBFZGl0b3IpID0+IHtcclxuXHRcdFx0XHRpZiAoIWNoZWNraW5nKSB7XHJcblx0XHRcdFx0XHR0aGlzLnVybFRvTWFya2Rvd24oZWRpdG9yKTtcclxuXHRcdFx0XHR9XHJcblx0XHRcdFx0cmV0dXJuIHRydWU7XHJcblx0XHRcdH0sXHJcblx0XHR9KTtcclxuXHJcblx0XHR0aGlzLnJlZ2lzdGVyTWFya2Rvd25Db2RlQmxvY2tQcm9jZXNzb3IoXCJOaWZ0eUxpbmtzXCIsIChzb3VyY2UsIGVsLCBjdHgpID0+IHtcclxuXHRcdFx0Y29uc3QgZGF0YSA9IHNvdXJjZS5zcGxpdCgnXFxuJykucmVkdWNlKChhY2MsIGxpbmUpID0+IHtcclxuXHRcdFx0XHRjb25zdCBba2V5LCAuLi52YWx1ZV0gPSBsaW5lLnNwbGl0KCc6ICcpO1xyXG5cdFx0XHRcdGFjY1trZXkudHJpbSgpXSA9IHZhbHVlLmpvaW4oJzogJykudHJpbSgpO1xyXG5cdFx0XHRcdHJldHVybiBhY2M7XHJcblx0XHRcdH0sIHt9KTtcclxuXHJcblx0XHRcdGNvbnN0IHVybCA9IGRhdGEudXJsO1xyXG5cdFx0XHRsZXQgdGl0bGUgPSBkYXRhLnRpdGxlIHx8IFwiXCI7XHJcblx0XHRcdGxldCBkZXNjcmlwdGlvbiA9IGRhdGEuZGVzY3JpcHRpb24gfHwgXCJcIjtcclxuXHRcdFx0Y29uc3QgaW1hZ2VMaW5rID0gZGF0YS5pbWFnZTtcclxuXHRcdFx0Y29uc3QgaWNvbkxpbmsgPSBkYXRhLmZhdmljb247XHJcblxyXG5cdFx0XHR0aXRsZSA9IHRpdGxlLnJlcGxhY2UoL1xcc3szLH0vZywgJyAnKS50cmltKCk7XHJcblx0XHRcdGRlc2NyaXB0aW9uID0gZGVzY3JpcHRpb24ucmVwbGFjZSgvXFxzezMsfS9nLCAnICcpLnRyaW0oKTtcclxuXHJcblx0XHRcdGNvbnN0IGNhcmRUZXh0U3R5bGUgPSBpbWFnZUxpbmsgPyBcIlwiIDogJyBzdHlsZT1cIndpZHRoOiAxMDAlO1wiJztcclxuXHJcblx0XHRcdGNvbnN0IGljb25IVE1MID0gaWNvbkxpbmsgPyBgPGltZyBjbGFzcz1cIm5pZnR5LWxpbmstaWNvblwiIHNyYz1cIiR7aWNvbkxpbmt9XCI+YCA6ICcnO1xyXG5cclxuXHRcdFx0Y29uc3QgaW1hZ2VDb250YWluZXJIVE1MID0gaW1hZ2VMaW5rID8gYFxyXG5cdFx0ICA8ZGl2IGNsYXNzPVwibmlmdHktbGluay1pbWFnZS1jb250YWluZXJcIj5cclxuXHRcdFx0PGRpdiBjbGFzcz1cIm5pZnR5LWxpbmstaW1hZ2VcIiBzdHlsZT1cImJhY2tncm91bmQtaW1hZ2U6IHVybCgnJHtpbWFnZUxpbmt9JylcIj48L2Rpdj5cclxuXHRcdCAgPC9kaXY+YCA6ICcnO1xyXG5cclxuXHRcdFx0Y29uc3QgaHRtbCA9IGBcclxuXHRcdCAgPGRpdiBjbGFzcz1cIm5pZnR5LWxpbmstY2FyZC1jb250YWluZXJcIj5cclxuXHRcdFx0PGEgY2xhc3M9XCJuaWZ0eS1saW5rLWNhcmRcIiBocmVmPVwiJHt1cmx9XCIgdGFyZ2V0PVwiX2JsYW5rXCI+XHJcblx0XHRcdCAgPGRpdiBjbGFzcz1cIm5pZnR5LWxpbmstY2FyZC10ZXh0XCIke2NhcmRUZXh0U3R5bGV9PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJuaWZ0eS1saW5rLWNhcmQtdGl0bGVcIj4ke3RpdGxlfTwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJuaWZ0eS1saW5rLWNhcmQtZGVzY3JpcHRpb25cIj4ke2Rlc2NyaXB0aW9ufTwvZGl2PlxyXG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJuaWZ0eS1saW5rLWhyZWZcIj5cclxuXHRcdFx0XHQgICR7aWNvbkhUTUx9JHt1cmx9XHJcblx0XHRcdFx0PC9kaXY+XHJcblx0XHRcdCAgPC9kaXY+XHJcblx0XHRcdCAgJHtpbWFnZUNvbnRhaW5lckhUTUx9XHJcblx0XHRcdDwvYT5cclxuXHRcdCAgPC9kaXY+XHJcblx0XHRgO1xyXG5cclxuXHRcdFx0ZWwuaW5uZXJIVE1MID0gaHRtbDtcclxuXHRcdH0pO1xyXG5cclxuXHJcblx0fVxyXG5cclxuXHRvbnVubG9hZCgpIHtcclxuXHRcdGNvbnNvbGUubG9nKFwidW5sb2FkaW5nIHBsdWdpblwiKTtcclxuXHR9XHJcblxyXG5cdGlzVXJsKHRleHQpIHtcclxuXHRcdGNvbnN0IHVybFJlZ2V4ID0gbmV3IFJlZ0V4cChcIl4oaHR0cDpcXFxcL1xcXFwvd3d3XFxcXC58aHR0cHM6XFxcXC9cXFxcL3d3d1xcXFwufGh0dHA6XFxcXC9cXFxcL3xodHRwczpcXFxcL1xcXFwvKT9bYS16MC05XSsoW1xcXFwtLl17MX1bYS16MC05XSspKlxcXFwuW2Etel17Miw1fSg6WzAtOV17MSw1fSk/KFxcXFwvLiopPyRcIik7XHJcblx0XHRyZXR1cm4gdXJsUmVnZXgudGVzdCh0ZXh0KTtcclxuXHR9XHJcblx0XHJcblx0YXN5bmMgdXJsVG9NYXJrZG93bihlZGl0b3IpIHtcclxuXHRcdGxldCBzZWxlY3RlZFRleHQgPSBlZGl0b3Iuc29tZXRoaW5nU2VsZWN0ZWQoKVxyXG5cdFx0XHQ/IGVkaXRvci5nZXRTZWxlY3Rpb24oKS50cmltKClcclxuXHRcdFx0OiBmYWxzZTtcclxuXHRcdGlmIChzZWxlY3RlZFRleHQgJiYgdGhpcy5pc1VybChzZWxlY3RlZFRleHQpKSB7XHJcblx0XHRcdGxldCB1cmwgPSBzZWxlY3RlZFRleHQ7XHJcblx0XHRcdGxldCBhcGkgPSBcIlwiO1xyXG5cdFx0XHRjb25zdCBzcGVjaWFsRG9tYWlucyA9IFtcIm1lZGl1bS5jb21cIl07XHJcblx0XHRcdGxldCBpc1NwZWNpYWxEb21haW4gPSBzcGVjaWFsRG9tYWlucy5zb21lKGRvbWFpbiA9PiB1cmwuaW5jbHVkZXMoZG9tYWluKSk7XHJcblx0XHRcdGlmIChpc1NwZWNpYWxEb21haW4pIHtcclxuXHRcdFx0XHRhcGkgPSBgaHR0cHM6Ly9hcGkubWljcm9saW5rLmlvLz91cmw9JHt1cmx9YDtcclxuXHRcdFx0fSBlbHNlIHtcclxuXHRcdFx0XHRhcGkgPSBgaHR0cDovL2lmcmFtZWx5LnNlcnZlci5jcmVzdGlmeS5jb20vaWZyYW1lbHk/dXJsPSR7dXJsfWA7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdHRyeSB7XHJcblx0XHRcdFx0bGV0IHJlc3BvbnNlID0gYXdhaXQgcmVxdWVzdFVybCh7IHVybDogYXBpIH0pO1xyXG5cdFx0XHRcdGxldCBkYXRhID0gaXNTcGVjaWFsRG9tYWluID8gcmVzcG9uc2UuanNvbi5kYXRhIDogcmVzcG9uc2UuanNvbjtcclxuXHRcdFx0XHRpZiAoIWlzU3BlY2lhbERvbWFpbiAmJiBkYXRhLmNvZGUgPT09IDQwMykge1xyXG5cdFx0XHRcdFx0YXBpID0gYGh0dHBzOi8vYXBpLm1pY3JvbGluay5pby8/dXJsPSR7dXJsfWA7XHJcblx0XHRcdFx0XHRyZXNwb25zZSA9IGF3YWl0IHJlcXVlc3RVcmwoeyB1cmw6IGFwaSB9KTtcclxuXHRcdFx0XHRcdGRhdGEgPSByZXNwb25zZS5qc29uLmRhdGE7XHJcblx0XHRcdFx0XHRpc1NwZWNpYWxEb21haW4gPSB0cnVlO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0XHRjb25zdCBpbWFnZUxpbmsgPSBpc1NwZWNpYWxEb21haW4gPyAoZGF0YS5pbWFnZSA/IGRhdGEuaW1hZ2UudXJsIDogJycpIDogZGF0YS5saW5rcy5maW5kKCh2YWx1ZSkgPT4gdmFsdWUudHlwZS5zdGFydHNXaXRoKFwiaW1hZ2VcIikgJiYgdmFsdWUucmVsLmluY2x1ZGVzKCd0d2l0dGVyJykpPy5ocmVmIHx8ICcnO1xyXG5cdFx0XHRcdGNvbnN0IGljb25MaW5rID0gaXNTcGVjaWFsRG9tYWluID8gKGRhdGEubG9nbyA/IGRhdGEubG9nby51cmwgOiAnJykgOiBkYXRhLmxpbmtzLmZpbmQoKHZhbHVlKSA9PiB2YWx1ZS50eXBlLnN0YXJ0c1dpdGgoXCJpbWFnZVwiKSAmJiB2YWx1ZS5yZWwuaW5jbHVkZXMoJ2ljb24nKSk/LmhyZWYgfHwgJyc7XHJcblxyXG5cdFx0XHRcdGxldCBtYXJrZG93bkxpbmsgPSBgXFxuXFxgXFxgXFxgTmlmdHlMaW5rc1xyXG51cmw6ICR7aXNTcGVjaWFsRG9tYWluID8gKGRhdGEudXJsIHx8IHVybCkgOiB1cmx9XHJcbnRpdGxlOiAke2lzU3BlY2lhbERvbWFpbiA/IGRhdGEudGl0bGUgOiBkYXRhLm1ldGEudGl0bGUgfHwgXCJcIn1cclxuZGVzY3JpcHRpb246ICR7aXNTcGVjaWFsRG9tYWluID8gZGF0YS5kZXNjcmlwdGlvbiA6IGRhdGEubWV0YS5kZXNjcmlwdGlvbiB8fCBcIlwifVxyXG5mYXZpY29uOiAke2ljb25MaW5rfVxyXG4ke2ltYWdlTGluayA/IGBpbWFnZTogJHtpbWFnZUxpbmt9YCA6IFwiXCJ9XHJcblxcYFxcYFxcYFxcbmA7XHJcblxyXG5cdFx0XHRcdGVkaXRvci5yZXBsYWNlU2VsZWN0aW9uKG1hcmtkb3duTGluayk7XHJcblx0XHRcdH0gY2F0Y2ggKGVycm9yKSB7XHJcblx0XHRcdFx0Y29uc29sZS5lcnJvcihlcnJvcik7XHJcblx0XHRcdFx0bmV3IE5vdGljZShcIkZhaWxlZCB0byBmZXRjaCBkYXRhLlwiKTtcclxuXHRcdFx0fVxyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0bmV3IE5vdGljZShcIlNlbGVjdCBhIFVSTCB0byBjb252ZXJ0IHRvIG5pZnR5IGxpbmsuXCIpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xyXG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XHJcblx0fVxyXG5cclxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XHJcblx0XHRhd2FpdCB0aGlzLnNhdmVEYXRhKHRoaXMuc2V0dGluZ3MpO1xyXG5cdH1cclxufVxyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBT087QUFJUCxJQUFNLG1C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