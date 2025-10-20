(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/components/PageHeader.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const PageHeader = ({ title, subtitle, backgroundClass = "bg-preventify-light-gray", size = "default" })=>{
    const paddingClasses = {
        default: "py-12 md:py-20",
        large: "py-16 md:py-24",
        small: "py-8 md:py-12"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: `${backgroundClass} ${paddingClasses[size]}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto px-4 sm:px-6 lg:px-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-3xl md:text-4xl lg:text-5xl font-bold text-center text-preventify-blue",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/src/components/PageHeader.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this),
                subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "mt-4 text-lg text-center max-w-3xl mx-auto text-preventify-dark-gray",
                    children: subtitle
                }, void 0, false, {
                    fileName: "[project]/src/components/PageHeader.tsx",
                    lineNumber: 26,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PageHeader.tsx",
            lineNumber: 23,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/PageHeader.tsx",
        lineNumber: 22,
        columnNumber: 5
    }, this);
};
_c = PageHeader;
const __TURBOPACK__default__export__ = PageHeader;
var _c;
__turbopack_context__.k.register(_c, "PageHeader");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/ui/card.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "Card": (()=>Card),
    "CardContent": (()=>CardContent),
    "CardDescription": (()=>CardDescription),
    "CardFooter": (()=>CardFooter),
    "CardHeader": (()=>CardHeader),
    "CardTitle": (()=>CardTitle)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-lg border bg-card text-card-foreground shadow-sm", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, this));
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c2 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, this));
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c4 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-2xl font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, this));
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c6 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 51,
        columnNumber: 3
    }, this));
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c8 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 63,
        columnNumber: 3
    }, this));
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"])(_c10 = ({ className, ...props }, ref)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/card.tsx",
        lineNumber: 71,
        columnNumber: 3
    }, this));
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/components/BlogPostCard.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>");
;
;
;
;
const BlogPostCard = ({ post })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "overflow-hidden h-full transition-all hover:shadow-lg",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                href: `/blog/${post.slug}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "aspect-[16/10] relative overflow-hidden bg-preventify-light-gray/20",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: post.coverImage,
                        alt: post.title,
                        className: "w-full h-full object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BlogPostCard.tsx",
                        lineNumber: 16,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/BlogPostCard.tsx",
                    lineNumber: 15,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/BlogPostCard.tsx",
                lineNumber: 14,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "p-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center text-sm mb-2 text-preventify-green",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Calendar$3e$__["Calendar"], {
                                className: "h-4 w-4 mr-1"
                            }, void 0, false, {
                                fileName: "[project]/src/components/BlogPostCard.tsx",
                                lineNumber: 25,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: post.date
                            }, void 0, false, {
                                fileName: "[project]/src/components/BlogPostCard.tsx",
                                lineNumber: 26,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/BlogPostCard.tsx",
                        lineNumber: 24,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/blog/${post.slug}`,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                            className: "font-display font-semibold text-xl text-preventify-blue mb-2 hover:text-preventify-green transition-colors",
                            children: post.title
                        }, void 0, false, {
                            fileName: "[project]/src/components/BlogPostCard.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/BlogPostCard.tsx",
                        lineNumber: 28,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-preventify-dark-gray mb-3 line-clamp-2",
                        children: post.excerpt
                    }, void 0, false, {
                        fileName: "[project]/src/components/BlogPostCard.tsx",
                        lineNumber: 33,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: post.categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs bg-preventify-light-gray text-preventify-dark-gray px-2 py-1 rounded-full",
                                children: category
                            }, category, false, {
                                fileName: "[project]/src/components/BlogPostCard.tsx",
                                lineNumber: 38,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/components/BlogPostCard.tsx",
                        lineNumber: 36,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BlogPostCard.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BlogPostCard.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
};
_c = BlogPostCard;
const __TURBOPACK__default__export__ = BlogPostCard;
var _c;
__turbopack_context__.k.register(_c, "BlogPostCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/data/blogPosts.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "blogPosts": (()=>blogPosts)
});
const blogPosts = [
    {
        id: 1,
        title: "Understanding Type 2 Diabetes Prevention",
        slug: "understanding-type-2-diabetes-prevention",
        excerpt: "Learn the essential strategies for preventing type 2 diabetes through lifestyle changes and regular health monitoring.",
        content: `
      <p>Type 2 diabetes is a chronic condition that affects the way your body metabolizes sugar, an important source of fuel for your body. With type 2 diabetes, your body either resists the effects of insulin — a hormone that regulates the movement of sugar into your cells — or doesn't produce enough insulin to maintain normal glucose levels.</p>
      <h2>Risk Factors</h2>
      <p>Several factors can increase your risk of developing type 2 diabetes:</p>
      <ul>
        <li>Weight: Being overweight is a primary risk factor</li>
        <li>Fat distribution: Storing fat mainly in your abdomen increases your risk</li>
        <li>Inactivity: The less active you are, the greater your risk</li>
        <li>Family history: Your risk increases if a parent or sibling has type 2 diabetes</li>
        <li>Age: Risk increases as you get older, especially after age 45</li>
      </ul>
      <h2>Prevention Strategies</h2>
      <p>Healthy lifestyle choices can help prevent type 2 diabetes, even if you have biological relatives living with diabetes. If you've been diagnosed with prediabetes, lifestyle changes can slow or stop the progression to diabetes.</p>
      <p>A healthy lifestyle includes:</p>
      <ul>
        <li>Eating healthy foods low in fat and calories and high in fiber</li>
        <li>Getting at least 150 minutes of moderate physical activity weekly</li>
        <li>Losing excess weight through diet and exercise</li>
      </ul>
      <p>At Preventify Hospitals, we offer comprehensive diabetes prevention programs designed to help you make sustainable lifestyle changes.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=1470&auto=format&fit=crop",
        date: "June 10, 2024",
        author: "Dr. Anjali Menon",
        categories: [
            "diabetes",
            "wellness",
            "prevention"
        ]
    },
    {
        id: 2,
        title: "The Power of South Indian Cuisine in Heart Health",
        slug: "south-indian-cuisine-heart-health",
        excerpt: "Discover how traditional South Indian dishes can contribute to better cardiovascular health and overall wellbeing.",
        content: `
      <p>South Indian cuisine, with its emphasis on rice, lentils, and vegetables, can be incredibly heart-healthy when prepared traditionally. The cuisine typically features less oil and dairy compared to North Indian counterparts, making it a great option for those conscious about heart health.</p>
      <h2>Heart-Healthy Ingredients</h2>
      <p>Several staple ingredients in South Indian cooking offer cardiovascular benefits:</p>
      <ul>
        <li>Coconut: Contains medium-chain triglycerides that may help reduce bad cholesterol</li>
        <li>Curry Leaves: Rich in antioxidants and may help control blood sugar levels</li>
        <li>Turmeric: Contains curcumin, which has anti-inflammatory properties</li>
        <li>Tamarind: High in antioxidants and may help lower cholesterol</li>
      </ul>
      <h2>Beneficial Cooking Methods</h2>
      <p>Many South Indian dishes are steamed, boiled, or lightly tempered rather than deep-fried, making them lower in unhealthy fats. The liberal use of spices adds flavor without the need for excess salt, which is beneficial for blood pressure management.</p>
      <h2>Recommended Dishes</h2>
      <p>Some heart-healthy South Indian options include:</p>
      <ul>
        <li>Idli - Steamed rice cakes that are easily digestible and low in calories</li>
        <li>Sambar - Lentil soup with vegetables rich in protein and fiber</li>
        <li>Rasam - Tamarind-based soup with antioxidant-rich spices</li>
        <li>Avial - Mixed vegetables cooked with coconut and yogurt</li>
      </ul>
      <p>At Preventify, our nutritionists can help you incorporate these heart-healthy traditional foods into your modern lifestyle to support cardiovascular wellness.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?q=80&w=1587&auto=format&fit=crop",
        date: "June 5, 2024",
        author: "Dr. Lakshmi Nair",
        categories: [
            "nutrition",
            "lifestyle",
            "wellness"
        ]
    },
    {
        id: 3,
        title: "Simple Exercise Routines for Busy Professionals",
        slug: "exercise-routines-busy-professionals",
        excerpt: "Stay healthy even with a packed schedule. These quick, effective workout routines can fit into any busy lifestyle.",
        content: `
      <p>In today's fast-paced world, finding time for exercise can be challenging. However, even short bursts of physical activity can significantly impact your health and well-being. This article presents simple, time-efficient exercise routines specifically designed for busy professionals.</p>
      <h2>The 7-Minute HIIT Workout</h2>
      <p>High-Intensity Interval Training (HIIT) allows you to get maximum benefits in minimum time. This scientifically proven 7-minute circuit includes:</p>
      <ul>
        <li>30 seconds of jumping jacks</li>
        <li>30 seconds of wall sits</li>
        <li>30 seconds of push-ups</li>
        <li>30 seconds of abdominal crunches</li>
        <li>30 seconds of step-ups</li>
        <li>30 seconds of squats</li>
        <li>30 seconds of triceps dips</li>
        <li>30 seconds of plank</li>
        <li>30 seconds of high knees running in place</li>
        <li>30 seconds of lunges</li>
        <li>30 seconds of push-up with rotation</li>
        <li>30 seconds of side plank (each side)</li>
      </ul>
      <p>Rest for 10 seconds between each exercise. The entire routine takes just 7 minutes and requires no special equipment beyond a chair and a wall.</p>
      <h2>Desk-Based Exercise</h2>
      <p>For days when you can't step away from your desk:</p>
      <ul>
        <li>Seated leg raises: Straighten one leg and hold for 2 seconds; lower it without letting it touch the floor. Repeat 15 times, then switch legs.</li>
        <li>Chair squats: Stand up from your chair, lower yourself until you're barely touching the seat, then stand again. Repeat 10-15 times.</li>
        <li>Desk push-ups: Place hands on the edge of your desk, walk feet back, and perform push-ups. Complete 10-15 repetitions.</li>
      </ul>
      <h2>Walking Meetings</h2>
      <p>Transform your meetings into walking sessions when possible. A 30-minute walking meeting can help you achieve nearly one-third of your daily recommended physical activity.</p>
      <p>Remember, consistency is more important than intensity. Even these short exercise routines, performed regularly, can lead to significant health improvements over time.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1470&auto=format&fit=crop",
        date: "May 28, 2024",
        author: "Dr. Rahul Thomas",
        categories: [
            "fitness",
            "lifestyle",
            "wellness"
        ]
    },
    {
        id: 4,
        title: "Managing Stress Through Mindfulness",
        slug: "managing-stress-through-mindfulness",
        excerpt: "Learn how mindfulness practices can help reduce stress, improve focus, and enhance overall mental wellbeing.",
        content: `
      <p>In our increasingly connected world, stress has become a common experience for many. Chronic stress can negatively impact both physical and mental health, contributing to conditions such as hypertension, heart disease, anxiety, and depression. Mindfulness—the practice of maintaining awareness of the present moment—offers a powerful tool for managing stress.</p>
      <h2>What is Mindfulness?</h2>
      <p>Mindfulness involves paying attention to the present moment with openness, curiosity, and acceptance. Instead of dwelling on the past or worrying about the future, mindfulness encourages engagement with what's happening right now.</p>
      <h2>Scientific Benefits</h2>
      <p>Research has shown that regular mindfulness practice can:</p>
      <ul>
        <li>Reduce stress hormones like cortisol</li>
        <li>Lower blood pressure</li>
        <li>Improve sleep quality</li>
        <li>Enhance immune function</li>
        <li>Increase focus and attention</li>
        <li>Reduce symptoms of anxiety and depression</li>
      </ul>
      <h2>Simple Mindfulness Practices</h2>
      <h3>1. Mindful Breathing (5 minutes)</h3>
      <p>Sit comfortably with your back straight. Close your eyes and focus on your breath—the sensation of air entering and leaving your nostrils or the rise and fall of your chest or abdomen. When your mind wanders (which it will), gently bring attention back to your breath without judgment.</p>
      <h3>2. Body Scan (10 minutes)</h3>
      <p>Lie down in a comfortable position. Bring awareness to different parts of your body, starting from your toes and moving up to your head. Notice any sensations without trying to change them.</p>
      <h3>3. Mindful Walking (15 minutes)</h3>
      <p>Walk slowly and deliberately, paying attention to the sensation of each foot touching and lifting from the ground. Notice the movement of your body and the environment around you.</p>
      <p>At Preventify, we offer mindfulness workshops and one-on-one sessions to help you develop a sustainable practice for stress management and improved wellbeing.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1566765790386-c43812572f20?q=80&w=1635&auto=format&fit=crop",
        date: "May 22, 2024",
        author: "Dr. Priya Iyer",
        categories: [
            "mental health",
            "wellness",
            "lifestyle"
        ]
    },
    {
        id: 5,
        title: "Preventive Health Screenings: What You Need to Know",
        slug: "preventive-health-screenings",
        excerpt: "A comprehensive guide to recommended health screenings by age and risk factors to catch potential issues early.",
        content: `
      <p>Preventive health screenings are medical tests that help detect potential health problems before symptoms appear. Early detection often leads to more effective treatment and better outcomes. This guide outlines key screenings recommended for adults based on age and risk factors.</p>
      <h2>Screenings for Adults (18-39 years)</h2>
      <ul>
        <li><strong>Blood Pressure:</strong> Check every 2 years if normal (less than 120/80 mm Hg). If higher, your doctor may recommend more frequent monitoring.</li>
        <li><strong>Cholesterol:</strong> Start screening at age 20, then every 5 years if normal.</li>
        <li><strong>Diabetes:</strong> Test if you have high blood pressure or cholesterol.</li>
        <li><strong>HIV:</strong> Everyone ages 15 to 65 should be screened at least once.</li>
      </ul>
      <h2>Additional Screenings for Adults (40-64 years)</h2>
      <ul>
        <li><strong>Diabetes:</strong> Screen every 3 years after age 45, earlier if overweight.</li>
        <li><strong>Colorectal Cancer:</strong> Begin screening at age 45.</li>
        <li><strong>Lung Cancer:</strong> Annual screening with low-dose CT scan for adults 50-80 with a 20 pack-year smoking history who currently smoke or quit within the past 15 years.</li>
      </ul>
      <h2>Gender-Specific Screenings</h2>
      <h3>For Women:</h3>
      <ul>
        <li><strong>Cervical Cancer:</strong> Pap test every 3 years from age 21-29. From 30-65, either a Pap test every 3 years or an HPV test every 5 years, or both tests together every 5 years.</li>
        <li><strong>Breast Cancer:</strong> Mammograms every 1-2 years starting at age 40 or 50, depending on risk factors.</li>
        <li><strong>Osteoporosis:</strong> Bone density test starting at age 65, or earlier based on risk factors.</li>
      </ul>
      <h3>For Men:</h3>
      <ul>
        <li><strong>Prostate Cancer:</strong> Discuss PSA testing with your doctor starting at age 50 (or 45 for high-risk groups).</li>
        <li><strong>Abdominal Aortic Aneurysm:</strong> One-time screening for men ages 65-75 who have ever smoked.</li>
      </ul>
      <p>At Preventify, we offer comprehensive preventive health check packages tailored to your age, gender, and risk factors. Contact us today to schedule your screenings.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1470&auto=format&fit=crop",
        date: "May 15, 2024",
        author: "Dr. Vijay Krishnan",
        categories: [
            "prevention",
            "wellness",
            "healthcare"
        ]
    },
    {
        id: 6,
        title: "Understanding the Glycemic Index for Better Blood Sugar Control",
        slug: "understanding-glycemic-index",
        excerpt: "Learn how the glycemic index can help you make food choices that support stable blood sugar levels.",
        content: `
      <p>The Glycemic Index (GI) is a valuable tool for anyone looking to manage their blood sugar levels, whether you have diabetes, prediabetes, or simply want to optimize your health. This scale rates carbohydrate-containing foods according to how quickly they raise blood glucose levels.</p>
      <h2>What is the Glycemic Index?</h2>
      <p>The GI ranks foods on a scale from 0 to 100 based on how much they raise blood sugar levels after eating:</p>
      <ul>
        <li><strong>Low GI foods (55 or less):</strong> Slowly digested, absorbed, and metabolized, causing a lower and slower rise in blood glucose</li>
        <li><strong>Medium GI foods (56-69):</strong> Cause moderate blood sugar elevation</li>
        <li><strong>High GI foods (70 or above):</strong> Quickly digested and absorbed, causing rapid spikes in blood sugar</li>
      </ul>
      <h2>Common Foods by GI Rating</h2>
      <h3>Low GI Foods:</h3>
      <ul>
        <li>Most non-starchy vegetables</li>
        <li>Most fruits (especially apples, oranges, berries)</li>
        <li>Legumes (beans, lentils, chickpeas)</li>
        <li>Unprocessed whole grains (steel-cut oats, barley)</li>
        <li>Dairy products</li>
      </ul>
      <h3>Medium GI Foods:</h3>
      <ul>
        <li>Whole wheat products</li>
        <li>Brown rice</li>
        <li>Sweet potatoes</li>
        <li>Basmati rice</li>
      </ul>
      <h3>High GI Foods:</h3>
      <ul>
        <li>White bread</li>
        <li>White rice</li>
        <li>Potatoes</li>
        <li>Most breakfast cereals</li>
        <li>Processed snack foods</li>
      </ul>
      <h2>Traditional Kerala Foods and Their GI</h2>
      <p>Many traditional Kerala foods have favorable glycemic indices:</p>
      <ul>
        <li><strong>Idli and Dosa:</strong> Medium GI (especially when made with parboiled rice)</li>
        <li><strong>Brown Rice Puttu:</strong> Lower GI than white rice versions</li>
        <li><strong>Avial:</strong> Low GI due to the mix of vegetables</li>
        <li><strong>Sambar:</strong> Low GI thanks to the lentils and vegetables</li>
      </ul>
      <p>At Preventify's diabetes management program, our nutritionists work with you to create meal plans that incorporate low GI foods while respecting your cultural food preferences and taste preferences.</p>
    `,
        coverImage: "https://images.unsplash.com/photo-1579113800032-c38bd7635818?q=80&w=1587&auto=format&fit=crop",
        date: "May 8, 2024",
        author: "Dr. Maya Joseph",
        categories: [
            "diabetes",
            "nutrition",
            "wellness"
        ]
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/blog/page.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PageHeader.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlogPostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BlogPostCard.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$blogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/blogPosts.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const BlogPage = ()=>{
    _s();
    const [filteredPosts, setFilteredPosts] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$blogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogPosts"]);
    const [activeCategory, setActiveCategory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("all");
    const categories = [
        "all",
        "wellness",
        "diabetes",
        "lifestyle",
        "nutrition"
    ];
    const filterByCategory = (category)=>{
        setActiveCategory(category);
        if (category === "all") {
            setFilteredPosts(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$blogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogPosts"]);
        } else {
            setFilteredPosts(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$blogPosts$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["blogPosts"].filter((post)=>post.categories.includes(category)));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PageHeader$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                title: "Health & Wellness Blog",
                subtitle: "Evidence-based articles on preventive healthcare, wellness, and better living"
            }, void 0, false, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 26,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-12",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "container mx-auto px-4 sm:px-6 lg:px-8",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-wrap justify-center mb-8 gap-2",
                            children: categories.map((category)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>filterByCategory(category),
                                    className: `px-4 py-2 rounded-full text-sm font-medium transition-colors ${activeCategory === category ? "bg-preventify-blue text-white" : "bg-preventify-light-gray text-preventify-dark-gray hover:bg-preventify-green hover:text-white"}`,
                                    children: category.charAt(0).toUpperCase() + category.slice(1)
                                }, category, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 34,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",
                            children: filteredPosts.map((post)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlogPostCard$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    post: post
                                }, post.id, false, {
                                    fileName: "[project]/src/app/blog/page.tsx",
                                    lineNumber: 53,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/blog/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/blog/page.tsx",
                    lineNumber: 32,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/blog/page.tsx",
                lineNumber: 31,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true);
};
_s(BlogPage, "JzDw8muvk4jdCohElcjupKMrckw=");
_c = BlogPage;
const __TURBOPACK__default__export__ = BlogPage;
var _c;
__turbopack_context__.k.register(_c, "BlogPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s({
    "__iconNode": (()=>__iconNode),
    "default": (()=>Calendar)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const __iconNode = [
    [
        "path",
        {
            d: "M8 2v4",
            key: "1cmpym"
        }
    ],
    [
        "path",
        {
            d: "M16 2v4",
            key: "4m81vk"
        }
    ],
    [
        "rect",
        {
            width: "18",
            height: "18",
            x: "3",
            y: "4",
            rx: "2",
            key: "1hopcy"
        }
    ],
    [
        "path",
        {
            d: "M3 10h18",
            key: "8toen8"
        }
    ]
];
const Calendar = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Calendar", __iconNode);
;
 //# sourceMappingURL=calendar.js.map
}}),
"[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript) <export default as Calendar>": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "Calendar": (()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$calendar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/calendar.js [app-client] (ecmascript)");
}}),
}]);

//# sourceMappingURL=_725f2735._.js.map