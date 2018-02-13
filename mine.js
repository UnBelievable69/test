function applyWordMarkup(a, b, c, d) {
	if (d = d || b, className = typeToClass[c], a.html().search(d + "</a>") == -1) switch (className) {
		case "MTA_KWD":
		case "MTA_PLN_TYPE":
		case "MTA_PLN_BOTH":
		case "MTA_PLN_CLIENT":
		case "MTA_PLN_SERVER":
		case "MTA_STR_CLIENT_EV":
		case "MTA_STR_SERVER_EV":
			a.html(a.html().replace(d, "<span class='mta_highlight " + className + "'><a class='mta_highlight' href='https://wiki.multitheftauto.com/wiki/" + b + "' style='text-decoration: none;'>" + d + "</a></span>"));
			break;
		case "LUA_PLN":
			a.html(a.html().replace(d, "<span class='mta_highlight " + className + "'><a class='mta_highlight' href='http://www.lua.org/manual/5.1/manual.html#pdf-" + b + "' style='text-decoration: none;'>" + d + "</a></span>"))
	}
}

function applyElementMarkup(a, b) {
	var c = a.text().match(/\w+/g);
	if (c && !a.hasClass("mtaMarkup"))
		for (var d = 0; d < c.length; d++)
			if (h = c[d], mta_highlight_groups[h]) {
				for (var e = mta_highlight_groups[h], f = a, g = -1, i = "", j = !0;
					"undefined" != typeof e;) {
					if (i += j ? h : f.text().trim(), j = !1, "object" != typeof e) {
						if ("number" == typeof e) {
							g = e;
							break
						}
						break
					}
					f = f.next(), e = e[f.text().trim()]
				}
				for (g != -1 && b.indexOf(g) != -1 || b.indexOf(mta_highlight[h]) != -1 && applyWordMarkup(a, h, mta_highlight[h]), e = mta_highlight_groups[h], f = a, j = !0;
					"undefined" != typeof e && (applyWordMarkup(f, i, g, j ? h : f.text().trim()), j = !1, "object" == typeof e);) f = f.next(), e = e[f.text().trim()]
			} else b.indexOf(mta_highlight[h]) != -1 && applyWordMarkup(a, h, mta_highlight[h])
}

function applyMTAMarkupToPre(a, b) {
	$(b).find("a").replaceWith(function() {
		return $(this).contents()
	}), $(b).find("span:not([class])").replaceWith(function() {
		return $(this).contents()
	}), $(b).find("span.pln").each(function(a, b) {
		applyElementMarkup($(b), [3, 4, 5, 6, 7])
	}), $(b).find("span.kwd").each(function(a, b) {
		applyElementMarkup($(b), [2])
	}), $(b).find("span.str").each(function(a, b) {
		applyElementMarkup($(b), [4, 8, 9])
	}), $(b).addClass("mtaMarkup")
}

function applyMTAMarkup() {
	$("pre.lang-lua:not(.mtaMarkup)").each(applyMTAMarkupToPre)
}
var typeToClass = ["", "", "MTA_KWD", "LUA_PLN", "MTA_PLN_TYPE", "MTA_PLN_BOTH", "MTA_PLN_CLIENT", "MTA_PLN_SERVER", "MTA_STR_CLIENT_EV", "MTA_STR_SERVER_EV"],
	mta_highlight = void 0 === mh ? {} : mh,
	mta_highlight_groups = {};
for (var key in mta_highlight) {
	var sp = key.replace(".", "~.~").split("~");
	if (sp.length > 1) {
		var child = mta_highlight_groups;
		for (var splitKey in sp) {
			var luaVar = sp[splitKey];
			if (child = child || {}, splitKey == sp.length - 1) {
				child[luaVar] = mta_highlight[key];
				break
			}
			child[luaVar] = child[luaVar] || {}, child = child[luaVar]
		}
	}
}
