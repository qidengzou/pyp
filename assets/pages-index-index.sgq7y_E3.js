import {_ as e, d as t, s as a, a as l, o as s, h as o, b as i, c as n, e as c, f as r, g as d, i as u, j as p, k as f, r as m, l as g, $ as h, m as w, u as x, n as y, p as v, q as A, w as k, t as C, v as _, x as I, y as b, z as U, A as B, B as E, C as D, D as S, E as Q, F as L, G as V, H as R, I as T, J as W, K as z, S as P, L as G, M as O, N as M, O as J, P as j, Q as F, R as Y, T as K, U as N, V as Z, W as H, X as q, Y as X, Z as $, a0 as ee, a1 as te, a2 as ae, a3 as le} from "./index-D-1PyzFZ.js";
const se = e({
    name: "ss-download",
    props: {
        fileUrl: {
            type: String,
            default: ""
        },
        fileType: {
            type: String,
            default: ""
        }
    },
    data: () => ({}),
    methods: {
        toDownload(e) {
            this.downloadH5(e.src)
        },
        downloadH5(e) {
            t({
                url: e,
                success: e => {
                    if (console.log(e),
                    200 === e.statusCode) {
                        console.log("下载成功");
                        var t = document.createElement("a");
                        t.download = "",
                        t.href = e.tempFilePath,
                        document.body.appendChild(t),
                        t.click(),
                        t.remove()
                    }
                }
            })
        },
        saveFile(e) {
            a(),
            t({
                url: e,
                success: e => {
                    var t = e.tempFilePath;
                    l({
                        tempFilePath: t,
                        success: function(e) {
                            s({
                                filePath: e.savedFilePath,
                                fileType: "pdf",
                                showMenu: !0,
                                success: function(e) {
                                    o()
                                },
                                fail: function(e) {
                                    o()
                                }
                            })
                        },
                        fail(e) {
                            console.log(e),
                            o(),
                            console.log("保存失败")
                        }
                    })
                }
            })
        },
        getDownVideo(e) {
            a({
                mask: !0,
                title: "下载中..."
            });
            let l = (new Date).valueOf();
            t({
                url: e,
                filePath: wx.env.USER_DATA_PATH + "/" + l + ".mp4",
                success: e => {
                    let t = e.filePath;
                    i({
                        filePath: t,
                        success: e => {
                            n({
                                title: "下载成功",
                                icon: "success"
                            }),
                            wx.getFileSystemManager().unlink({
                                filePath: wx.env.USER_DATA_PATH + "/" + l + ".mp4",
                                success: function(e) {
                                    console.log("unlink-getFileSystemManager"),
                                    console.log(e)
                                }
                            })
                        }
                        ,
                        fail(e) {
                            n({
                                title: "保存失败",
                                icon: "none"
                            })
                        },
                        complete(e) {
                            console.log("saveVideoToPhotosAlbum-complete"),
                            console.log(e),
                            o()
                        }
                    })
                }
                ,
                fail(e) {
                    n({
                        title: "下载失败,请稍后再试",
                        icon: "none"
                    })
                },
                complete(e) {
                    console.log("downloadFiledownloadFiledownloadFiledownloadFiledownloadFile"),
                    console.log(e)
                }
            }).onProgressUpdate(this.onProgress)
        },
        onProgress(e) {
            a({
                mask: !0,
                title: e.progress ? "下载中" + e.progress + "%" : "下载中..."
            })
        },
        saveToPhotosAlbum(e) {
            t({
                url: e,
                success: e => {
                    const {statusCode: t, tempFilePath: a} = e;
                    200 === t ? c({
                        filePath: a,
                        success: e => {
                            console.log("data-----------------\x3e", e),
                            n({
                                title: "下载成功,文件已保存到" + e.path,
                                icon: "success"
                            })
                        }
                        ,
                        complete: e => {}
                    }) : n({
                        title: "下载失败",
                        icon: "none"
                    })
                }
                ,
                complete: () => {}
            }).onProgressUpdate((e => {
                showLoading.setTitle("  正在下载" + e.progress + "%  ")
            }
            ))
        },
        saveFileToApp(e) {
            var t = plus.downloader.createDownload(e, {}, (function(e, t) {
                n({
                    title: "下载完成",
                    mask: !1,
                    duration: 1e3
                }),
                console.log("status: " + t),
                200 == t ? (console.log("下载成功：" + e.filename),
                console.log("plus.io.convertLocalFileSystemURL(d.filename): " + plus.io.convertLocalFileSystemURL(e.filename)),
                plus.runtime.openFile(plus.io.convertLocalFileSystemURL(e.filename), {}, (function(e) {
                    console.log("打开成功")
                }
                ), (function(e) {
                    console.log("打开失败")
                }
                ))) : n({
                    title: "下载失败-02",
                    mask: !1,
                    duration: 1500
                })
            }
            ));
            try {
                t.start();
                var a = 0
                  , l = plus.nativeUI.showWaiting("正在下载");
                t.addEventListener("statechanged", (function(e, t) {
                    switch (e.state) {
                    case 1:
                        l.setTitle("正在下载");
                        break;
                    case 2:
                        l.setTitle("已连接到服务器");
                        break;
                    case 3:
                        a = parseInt(parseFloat(e.downloadedSize) / parseFloat(e.totalSize) * 100),
                        l.setTitle("  正在下载" + a + "%  ");
                        break;
                    case 4:
                        plus.nativeUI.closeWaiting()
                    }
                }
                ))
            } catch (s) {
                plus.nativeUI.closeWaiting(),
                n({
                    title: "更新失败-03",
                    mask: !1,
                    duration: 1500
                })
            }
        }
    },
    watch: {
        fileType: {
            deep: !0,
            handler: function(e) {
                this.fileUrl && this.toDownload({
                    type: this.fileType,
                    src: this.fileUrl
                })
            }
        }
    }
}, [["render", function(e, t, a, l, s, o) {
    const i = u;
    return r(),
    d(i)
}
]])
  , oe = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAtCAYAAAD2g9hxAAAAAXNSR0IArs4c6QAAA2RJREFUaEPtmoFtFDEQRWcqACoAKgAqACogVEBSAbkKuFRAUgGkApIK4DpIKgAqACoY9kXek2/P9tqbPXllGGmlSOt1/D3fM+M/p1LZzOyViLwTkefuYUXfur+vRORSVX8fYol6iElz5jSzhyLyUUSOE+N/iMiJqrIRs1pN4J9GQPtA16p6NifyKsAdvb8WAsHrb+eifi3gnN83AeAbEXkiIo8jm8J5B/y9qV8LOAt/6YH7SWDrvWlmp927dRcDHkQ24FxVV4WM2Rm+FOCbzotE962ZGVH+s4g8iwC8cd4nABbbYoGDxEX+c5fuQuCgPlGfo1Nkd8DNLHWuiibMHAwYPNrbnscH3j9y3o9RH2asSgKfmhl5lNRS05LAPefg2RT18T5HYNQA/t1F0tHBBxxAhZYqZPyzD1veR9YC9fE8DEgawBkco9DY93O9J0Vln1NXBzA+tm7e4f1ouQtw0saHuRBMmOeiWyDpq8hc4AOgnxb9OYj2bGiQ+n1wI5XspJOiVUwbjDeuOopPSkf9v8xw3KmqXgyXWCWdTdun+FeO+pzrWMW3V+42AdxFfW57gA+VwgyB8q/7c98McI/6xAuuuyG7UdUXvGgOuPN+qtw9U9V1k8A96sfK3UfNAveoH7oCn/wLwAl6vwYH/rp54I72w/v/5j/wuYuKpcznSlsuYlC+t/ap3gEP3eZWTVPdzGIS9tMmgTt6f4lcvO5ug80BNzNkKjztn+n+bG/V3KaAmxk1euxu/wcG9PfzJoA7sRRq+wKmn1huHeitItMLEXxQQ366LVFGQynSiaV4OkRtPkGEoPe2I0PVVlmzxcEh6IxuK9Q+jml5S1FZEQiy+2Guy0IAS1H7KCVrLUVlLZGXkZYpSmJ2d98eqxyXoLKyxpyGAmcYL5OuQga18XIWc/zgFptwbPOmvKd54AuDYy0kKE3UptUVMtrLgM7+2UiVdNapovvXxEG31BMS0PxT1KVzkqJ+cKcWC3yk7AQMVRhezuqVDdEvBfhW/WSBTieH2rHcfO1SVTa1lwI8pIPRUeEBbCxNEcAoRoqpvRTgU1rTlJ0UJJOovQjgjs7DAJfKDpdcPkqi9liqqXLGHXAonep2MixZdo6BS72vBtxLV9CeZ/grKDZl73JxH7D+t9WBzwWkdJ6/fuRWBVNRfqYAAAAASUVORK5CYII="
  , ie = "" + new URL("dy3-BGt2AXqF.png",import.meta.url).href
  , ne = "" + new URL("fdy3-jepmxUWu.png",import.meta.url).href
  , ce = "data:image/png;base64,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"
  , re = "" + new URL("xhs31-QNYRjjtk.png",import.meta.url).href
  , de = "data:image/png;base64,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"
  , ue = "" + new URL("fsph3-IKGoPfVR.png",import.meta.url).href
  , pe = "data:image/png;base64,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"
  , fe = "" + new URL("ks31-D-BQwDZS.png",import.meta.url).href
  , me = p("PublicFun", {
    state: () => ({
        inWxShade: !1
    })
})
  , {inWxShade: ge} = f(me())
  , he = () => {
    if ("micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i))
        return ge.value = !0,
        !0
}
  , we = () => {
    const e = navigator.userAgent.toLowerCase()
      , t = /iphone|ipad|ipod/.test(e)
      , a = /safari/.test(e) && !/chrome|crios|fxios/.test(e);
    return t && a
}
  , xe = m(null)
  , ye = m(null);
const ve = m({})
  , Ae = () => (a({
    title: "",
    mask: !0
}),
h.get("/store/xhsConfig", {
    params: {
        plat_id: ye.value.plat_id
    }
}).then((e => e.data.data)).catch((e => {}
)))
  , ke = m("")
  , Ce = m(null)
  , _e = m(null)
  , Ie = m(null)
  , be = m(null)
  , Ue = m(null)
  , Be = m(null)
  , Ee = m(null)
  , De = m(null)
  , Se = m(null)
  , Qe = m(null)
  , Le = m(null)
  , Ve = {
    shareDY: async () => {
        if (!he()) {
            a({
                mask: !0
            });
            try {
                const e = await (xe.value = g("storeInfo"),
                h.post("/store/douyinH5", {
                    sid: xe.value.sid,
                    shop_id: xe.value.shop_id,
                    plat_id: xe.value.plat_id,
                    fans: g("fans")
                }).then((e => {
                    if (200 == e.data.code)
                        return e.data.data;
                    n({
                        title: e.data.msg,
                        icon: "none"
                    })
                }
                )).catch((e => {}
                )));
                if (null == e)
                    return;
                1 == e.enable_hexiaoma && window.localStorage.setItem("share_id", e.share_id),
                window.location.href = e.schema
            } catch (e) {
                console.log(e)
            } finally {
                o()
            }
        }
    }
    ,
    shareXHS: async () => {
        he() || (ye.value = g("storeInfo"),
        ve.value = await Ae(),
        ke.value = await (ye.value = g("storeInfo"),
        h.post("/store/xiaohongshuH5", {
            suid: ye.value.sid,
            shop_id: ye.value.shop_id,
            plat_id: ye.value.plat_id
        }).then((e => {
            if (200 == e.data.code)
                return e.data.data;
            n({
                title: e.data.msg,
                icon: "none"
            })
        }
        )).catch((e => {}
        ))),
        console.log(ke.value),
        null != ke.value ? (setTimeout(( () => {
            xhs.share({
                shareInfo: {
                    type: "video",
                    title: ke.value.title,
                    content: ke.value.desc,
                    video: ke.value.video,
                    cover: ke.value.cover
                },
                verifyConfig: {
                    appKey: ve.value.appKey,
                    nonce: ve.value.nonce,
                    timestamp: ve.value.timeStamp,
                    signature: ve.value.sign
                },
                fail: e => {
                    w({
                        title: "提示",
                        content: e,
                        confirmColor: "#439c5b"
                    })
                }
            })
        }
        ), 200),
        o()) : o())
    }
    ,
    shareXHSBJ: async () => {
        he() || (ye.value = g("storeInfo"),
        ve.value = await Ae(),
        ke.value = await h.get("/store/copywriting", {
            params: {
                sid: ye.value.sid,
                shop_id: ye.value.shop_id,
                plat_id: ye.value.plat_id,
                copywriter_type: "xhs"
            }
        }).then((e => {
            if (0 !== e.data.data.length)
                return e.data.data;
            n({
                title: e.data.msg,
                icon: "none"
            })
        }
        )).catch((e => {}
        )),
        null != ke.value ? (setTimeout(( () => {
            var e;
            xhs.share({
                shareInfo: {
                    type: "normal",
                    title: ke.value.title.replace(/&/g, ""),
                    content: `${ke.value.content.replace(/&/g, "")}${e = ke.value.hashtag_list.join(" #"),
                    e = (e = e.replace(/\s/g, "").replace(/#{2,}/g, "#").replace(/#/g, " #")).replace(/#+$/, "")}`,
                    images: ke.value.path
                },
                verifyConfig: {
                    appKey: ve.value.appKey,
                    nonce: ve.value.nonce,
                    timestamp: ve.value.timeStamp,
                    signature: ve.value.sign
                },
                fail: e => {
                    w({
                        title: "提示",
                        content: e,
                        confirmColor: "#439c5b"
                    })
                }
            })
        }
        ), 200),
        o()) : o())
    }
    ,
    shareGZXHS: () => {
        if (he())
            return;
        ye.value = g("storeInfo");
        const e = new URL(`xhsdiscover://user/${ye.value.follow_xiaohongshu}`);
        window.location.href = e
    }
    ,
    shareJWX: () => {
        Ce.value = g("storeInfo");
        const e = encodeURIComponent(`sid=${Ce.value.store_id}&shop_id=${Ce.value.shop_id}`)
          , t = new URL(`weixin://dl/business/?appid=${Ce.value.wxxcx_appid}&path=pagesMy/addwx/index&query=${e}`);
        window.location.href = t
    }
    ,
    shareFPYQ: () => {
        _e.value = g("storeInfo");
        const e = new URL("weixin://");
        window.location.href = e
    }
    ,
    shareGD: (e, t) => {
        Ie.value = g("storeInfo");
        const a = new URL(`weixin://dl/business/?appid=${e}&path=${t}`);
        window.location.href = a
    }
    ,
    shareWIFI: () => {
        be.value = g("storeInfo");
        const e = encodeURIComponent(`sid=${be.value.store_id}&shop_id=${be.value.shop_id}`)
          , t = new URL(`weixin://dl/business/?appid=${be.value.wxxcx_appid}&path=pagesMy/wifi/index&query=${e}`);
        window.location.href = t
    }
    ,
    shareDYDP: () => {
        if (he())
            return;
        Ue.value = g("storeInfo");
        const e = new URL("snssdk1128://poi/detail");
        e.searchParams.append("id", Ue.value.poi_id),
        window.location.href = e
    }
    ,
    shareGZDY: () => {
        if (he())
            return;
        Ue.value = g("storeInfo");
        const e = new URL(`snssdk1128://user/profile/${Ue.value.follow_douyin}?refer=web&gd_label=click_wap_profile_bottom&type=need_follow&needlaunchlog=1`);
        window.location.href = e
    }
    ,
    shareDZDP: () => {
        if (he())
            return;
        if (Be.value = g("storeInfo"),
        "" == Be.value.comment_id)
            return void n({
                title: "大众点评当前未配置",
                icon: "none"
            });
        const e = new URL("dianping://shopinfo");
        e.searchParams.append("shopuuid", Be.value.comment_id),
        window.location.href = e
    }
    ,
    shareMTDP: () => {
        if (he())
            return;
        if (Ee.value = g("storeInfo"),
        console.log(Ee.value),
        "" == Ee.value.meituan_id)
            return void n({
                title: "美团点评当前未配置",
                icon: "none"
            });
        let e = "";
        e = "餐饮" == Ee.value.meituan_cate ? new URL("imeituan://www.meituan.com/food/poi/detail") : new URL("imeituan://www.meituan.com/gc/poi/detail"),
        e.searchParams.append("id", Ee.value.meituan_id),
        window.location.href = e
    }
    ,
    shareGZKS: () => {
        if (he())
            return;
        De.value = g("storeInfo");
        const e = new URL(`kwai://profile/${De.value.follow_kuaishou}`);
        e.searchParams,
        window.location.href = e
    }
    ,
    shareKS: () => {
        if (he())
            return;
        const e = new URL(`kwai://webview?url=${window.location.href}&type=kuaishou`);
        window.location.href = e
    }
    ,
    shareGDDP: async () => {
        if (Se.value = g("storeInfo"),
        console.log(Se.value),
        null == Se.value.gddp_id || "" == Se.value.gddp_id)
            return void n({
                title: "高德点评当前未配置",
                icon: "none"
            });
        const e = new URL("amapuri://poi/detail");
        var t = e.searchParams;
        t.append("poiid", Se.value.gddp_id.id),
        t.append("lat", Se.value.gddp_id.lat),
        t.append("lon", Se.value.gddp_id.lon),
        window.location.href = e
    }
    ,
    shareSPH: () => {
        Qe.value = g("storeInfo");
        const e = encodeURIComponent(`sid=${Qe.value.store_id}&shop_id=${Qe.value.shop_id}`)
          , t = new URL(`weixin://dl/business/?appid=${Qe.value.wxxcx_appid}&path=pagesMy/sph/index&query=${e}`);
        window.location.href = t
    }
    ,
    shareXCDP: () => {
        he() || (Le.value = g("storeInfo"),
        console.log(Le.value),
        null != Le.value.ctrip || "餐饮" != Le.value.ctrip_cate ? "餐饮" == Le.value.ctrip_cate ? window.location.href = Le.value.ctrip : window.location.href = "ctrip://wireless" : n({
            title: "携程点评当前未配置",
            icon: "none"
        }))
    }
    ,
    shareXCBJ: () => {
        he() || (Le.value = g("storeInfo"),
        window.location.href = `ctrip://wireless/destination/toWriteTravelPage?poiId=${Le.value.ctrip_bj_id}&poiName=${Le.value.ctrip_bj.split(",")[0].trim()}`)
    }
}
  , Re = e({
    __name: "fsp",
    setup(e) {
        const l = x()
          , s = m(!1)
          , i = m("")
          , c = () => {
            const e = window.localStorage.getItem("share_id");
            null != e && (a({
                mask: !0
            }),
            h.get(`/store/couponShow/${e}`).then((e => {
                200 === e.data.code ? i.value = e.data.data.qrcode : n({
                    title: e.data.msg,
                    icon: "none"
                })
            }
            )).catch((e => {
                console.log(e)
            }
            )).finally(( () => {
                o(),
                s.value = !0
            }
            )))
        }
          , p = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , f = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , O = () => {
            "visible" === document.visibilityState ? console.log("用户进入浏览器") : console.log("用户退出浏览器")
        }
        ;
        y(( () => {
            c(),
            document.addEventListener("visibilitychange", O)
        }
        )),
        v(( () => {
            document.removeEventListener("visibilitychange", O)
        }
        ));
        const M = () => {
            Ve.shareDY()
        }
          , J = () => {
            Ve.shareXHS()
        }
          , j = () => {
            Ve.shareKS()
        }
          , F = m({});
        A(( () => {
            c(),
            setTimeout(( () => {
                F.value = l.storeInfo;
                const e = new URLSearchParams(window.location.search);
                "kuaishou" == e.get("type") && w({
                    title: "提示",
                    content: "点击确定发布视频",
                    showCancel: !1,
                    success: () => {
                        window.location.href = `${window.location.origin}/store/kuaishouOauth?plat_id=${F.value.plat_id}&url=${encodeURIComponent(window.location.href)}`
                    }
                }),
                "publish" == e.get("action") && (a({
                    mask: !0,
                    title: "发布视频中"
                }),
                h.get(`${window.location.origin}/store/kuaishouh5?suid=${F.value.sid}&shop_id=${F.value.shop_id}&plat_id=${F.value.plat_id}&fans=${g("fans")}`).then((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    }),
                    o()
                }
                )).catch((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    })
                }
                )))
            }
            ), 500)
        }
        ));
        const Y = m(!1)
          , K = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => [Y.value, s.value]), (e => {
            e[0] || e[1] ? K(!0) : K(!1)
        }
        ));
        const N = () => {
            Y.value = !1,
            q.value = "",
            X.value = ""
        }
          , Z = async () => {
            if (!he()) {
                a({
                    mask: !0
                });
                try {
                    const e = await h.get("/store/douyinVideo", {
                        params: {
                            suid: F.value.sid,
                            plat_id: F.value.plat_id,
                            shop_id: F.value.shop_id
                        }
                    });
                    200 === e.data.code ? (o(),
                    q.value = e.data.data,
                    $.value = e.data.data.desc,
                    Y.value = !0) : n({
                        icon: "none",
                        title: e.data.msg
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        }
          , H = () => {
            window.location.href = "weixin://"
        }
          , q = m("")
          , X = m("")
          , $ = m("")
          , ee = (e, l) => {
            a({
                mask: !0
            }),
            t({
                url: e.videoUrl,
                success: t => {
                    if (200 === t.statusCode) {
                        o();
                        const a = t.tempFilePath
                          , l = document.createElement("a");
                        l.download = e.title,
                        l.href = a,
                        document.body.appendChild(l),
                        l.click(),
                        l.remove()
                    }
                }
                ,
                fail: e => {
                    n({
                        title: e,
                        icon: "none"
                    })
                }
            })
        }
        ;
        return (e, t) => {
            const a = u
              , o = C(I("up-icon"), _)
              , m = P
              , g = C(I("up-text"), b)
              , h = G
              , x = C(I("up-button"), U)
              , y = C(I("up-popup"), B)
              , v = C(I("ss-download"), se)
              , A = C(I("up-image"), E)
              , k = C(I("up-modal"), D);
            return r(),
            d(a, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(a, {
                    class: "black-card"
                }, {
                    default: S(( () => [L("img", {
                        class: "jiantou",
                        src: oe,
                        alt: ""
                    }), L("img", {
                        class: "black-card-text",
                        src: "data:image/png;base64,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",
                        alt: ""
                    }), Q(a, {
                        class: "black-card-circle"
                    })])),
                    _: 1
                }), Q(a, {
                    class: "content-card flex flex-sb"
                }, {
                    default: S(( () => [Q(a, {
                        class: "flex flex-sb flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(l).dyswich ? (r(),
                        d(a, {
                            key: 0,
                            class: "cards-min",
                            onClick: M,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(a, {
                                class: "flex flex-ac",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: ie,
                                    alt: ""
                                }), Q(a, {
                                    class: "f-700",
                                    style: {
                                        "margin-left": "10rpx",
                                        "font-size": "34rpx"
                                    }
                                }, {
                                    default: S(( () => [R("发抖音")])),
                                    _: 1
                                })])),
                                _: 1
                            }), Q(a, {
                                style: {
                                    position: "absolute",
                                    bottom: "0",
                                    right: "0"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    style: {
                                        width: "119rpx",
                                        height: "120rpx"
                                    },
                                    src: ne,
                                    alt: ""
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(l).xhsswich ? (r(),
                        d(a, {
                            key: 1,
                            class: "cards-min",
                            onClick: J,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(a, {
                                class: "flex flex-ac",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: ce,
                                    alt: ""
                                }), Q(a, {
                                    class: "f-700",
                                    style: {
                                        "margin-left": "10rpx",
                                        "font-size": "34rpx"
                                    }
                                }, {
                                    default: S(( () => [R("发小红书")])),
                                    _: 1
                                })])),
                                _: 1
                            }), Q(a, {
                                style: {
                                    position: "absolute",
                                    bottom: "0",
                                    right: "0"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    style: {
                                        width: "119rpx",
                                        height: "120rpx"
                                    },
                                    src: re,
                                    alt: ""
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(l).sphswich ? (r(),
                        d(a, {
                            key: 2,
                            class: "cards-min flex",
                            onClick: Z,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(a, {
                                class: "flex flex-ac",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: de,
                                    alt: ""
                                }), Q(a, {
                                    class: "f-700",
                                    style: {
                                        "margin-left": "10rpx",
                                        "font-size": "34rpx"
                                    }
                                }, {
                                    default: S(( () => [R("发视频号")])),
                                    _: 1
                                })])),
                                _: 1
                            }), Q(a, {
                                style: {
                                    position: "absolute",
                                    bottom: "0",
                                    right: "0"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    style: {
                                        width: "110rpx",
                                        height: "90rpx"
                                    },
                                    src: ue,
                                    alt: ""
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(l).ksswich ? (r(),
                        d(a, {
                            key: 3,
                            class: "cards-min flex",
                            onClick: j,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(a, {
                                class: "flex flex-ac",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: pe,
                                    alt: ""
                                }), Q(a, {
                                    class: "f-700",
                                    style: {
                                        "margin-left": "10rpx",
                                        "font-size": "34rpx"
                                    }
                                }, {
                                    default: S(( () => [R("发快手")])),
                                    _: 1
                                })])),
                                _: 1
                            }), Q(a, {
                                style: {
                                    position: "absolute",
                                    bottom: "0",
                                    right: "0"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    style: {
                                        width: "119rpx",
                                        height: "120rpx"
                                    },
                                    src: fe,
                                    alt: ""
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }), Q(y, {
                    show: Y.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: N,
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(a, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(a, {
                            class: "icon",
                            onClick: t[0] || (t[0] = e => Y.value = !1)
                        }, {
                            default: S(( () => [Q(o, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(a, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(a, {
                                class: "name"
                            }, {
                                default: S(( () => [R("视频号文案")])),
                                _: 1
                            }), Q(a, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(m, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "200rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(a, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W($.value), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(a, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(a, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(g, {
                                        text: "复制文案",
                                        align: "right",
                                        color: "#439c5b",
                                        onClick: t[1] || (t[1] = e => {
                                            return t = $.value,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(a, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(h, {
                                style: {
                                    width: "100%",
                                    height: "400rpx"
                                },
                                src: q.value.videoUrl,
                                "show-center-play-btn": !1,
                                poster: `${q.value.videoUrl}?x-oss-process=video/snapshot,t_14321,f_jpg,w_0,h_0,ar_h`
                            }, null, 8, ["src", "poster"])])),
                            _: 1
                        }), Q(a, {
                            style: {
                                display: "flex"
                            }
                        }, {
                            default: S(( () => [Q(x, {
                                text: "保存视频",
                                shape: "circle",
                                onClick: t[2] || (t[2] = e => {
                                    return t = q.value,
                                    void (we() ? w({
                                        title: "下载提示",
                                        content: "点击确定后视频将下载到浏览器，您可以点击下方地址栏中下载按钮打开视频，点击分享按钮存储视频，即可保存到相册中",
                                        confirmColor: "#439c5b",
                                        success(e) {
                                            e.confirm && ee(t)
                                        }
                                    }) : ee(t));
                                    var t
                                }
                                ),
                                style: {
                                    "margin-right": "15px"
                                }
                            }), Q(x, {
                                text: "去点评",
                                shape: "circle",
                                color: "#439c5b",
                                onClick: H
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(v, {
                    ref: "ssdownload",
                    fileUrl: q.value,
                    fileType: X.value
                }, null, 8, ["fileUrl", "fileType"]), Q(k, {
                    show: s.value,
                    title: "提示",
                    "show-cancel-button": "",
                    onCancel: p,
                    onConfirm: f
                }, {
                    default: S(( () => [Q(a, {
                        style: {
                            display: "flex",
                            "flex-direction": "column",
                            "align-items": "center"
                        }
                    }, {
                        default: S(( () => [Q(a, {
                            style: {
                                color: "gray",
                                "margin-bottom": "20upx",
                                "text-align": "center"
                            }
                        }, {
                            default: S(( () => [R(W("" != i.value ? "视频发布成功，建议截图保存二维码" : "获取失败，可手动获取尝试") + " ", 1), L("br"), R(" (长按也可保存) ")])),
                            _: 1
                        }), Q(A, {
                            "show-loading": !0,
                            src: i.value,
                            width: "200px",
                            height: "200px"
                        }, null, 8, ["src"]), "" == i.value ? (r(),
                        d(a, {
                            key: 0,
                            style: {
                                "margin-top": "30upx",
                                width: "100%"
                            }
                        }, {
                            default: S(( () => [Q(x, {
                                text: "手动获取",
                                color: "#439c5b",
                                onClick: c
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-1ca16cf0"]])
  , Te = "" + new URL("zwtp-COGFtvcF.svg",import.meta.url).href
  , We = "" + new URL("dz3-DHVq_Tvo.png",import.meta.url).href
  , ze = "" + new URL("gd3-B5SIdw-o.png",import.meta.url).href
  , Pe = "" + new URL("mt3-aVby1Iyt.png",import.meta.url).href
  , Ge = "" + new URL("xiecheng-DZYwjqA2.png",import.meta.url).href
  , Oe = e({
    __name: "dpdk",
    setup(e) {
        const t = x();
        g("storeInfo");
        const l = async e => {
            if (!he()) {
                a({
                    title: "",
                    mask: !0
                });
                try {
                    const a = await h.get("/store/copywriting", {
                        params: {
                            plat_id: t.storeInfo.plat_id,
                            shop_id: t.storeInfo.shop_id,
                            sid: t.storeInfo.sid,
                            copywriter_type: e
                        }
                    });
                    if (200 === a.data.code)
                        return a.data.data;
                    n({
                        icon: "none",
                        title: a.data.msg
                    })
                } catch (l) {
                    console.log(l)
                } finally {
                    o()
                }
            }
        }
          , s = m(!1)
          , i = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => s.value), (e => {
            i(!!e)
        }
        ));
        const c = () => {
            Ve.shareXHSBJ()
        }
          , p = async e => {
            if ("大众点评" == e) {
                const e = await l("dzdp");
                null != e && w(e, "dzdp", "大众点评文案")
            }
            if ("抖音点评" == e) {
                const e = await l("dydp");
                null != e && w(e, "dydp", "抖音点评文案")
            }
            if ("高德点评" == e) {
                const e = await l("mtdp");
                null != e && w(e, "gddp", "高德点评文案")
            }
            if ("美团点评" == e) {
                const e = await l("mtdp");
                null != e && w(e, "mtdp", "美团点评文案")
            }
            if ("携程点评" == e) {
                const e = await l("xcwa");
                null != e && w(e, "xcdp", "携程点评文案")
            }
            if ("携程笔记" == e) {
                const e = await l("xcwa");
                null != e && w(e, "xcbj", "携程笔记文案")
            }
        }
          , f = m({
            type: "",
            title: "",
            content: "",
            srcList: ""
        })
          , w = (e, t, a) => {
            if (null != e && ("" == e.path || e.path),
            null == e)
                return "dydp" == t && Ve.shareDYDP(),
                "dzdp" == t && Ve.shareDZDP(),
                "gddp" == t && Ve.shareGDDP(),
                "mtdp" == t && Ve.shareMTDP(),
                "xcdp" == t && Ve.shareXCDP(),
                void ("xcbj" == t && Ve.shareXCBJ());
            setTimeout(( () => {
                f.value = {
                    type: t,
                    title: a,
                    content: e.title,
                    srcList: e.path
                }
            }
            ), 500),
            s.value = !0
        }
        ;
        return (e, a) => {
            const l = u
              , o = C(I("up-icon"), _)
              , i = P
              , m = C(I("up-text"), b)
              , g = K
              , h = C(I("up-grid-item"), O)
              , w = C(I("up-grid"), M)
              , x = C(I("up-button"), U)
              , y = C(I("up-popup"), B);
            return r(),
            d(l, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(l, {
                    class: "black-card"
                }, {
                    default: S(( () => [L("img", {
                        class: "jiantou",
                        src: oe,
                        alt: ""
                    }), L("img", {
                        class: "black-card-text",
                        src: "data:image/png;base64,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",
                        alt: ""
                    }), Q(l, {
                        class: "black-card-circle"
                    })])),
                    _: 1
                }), Q(l, {
                    class: "content-card flex flex-sb flex-wrap"
                }, {
                    default: S(( () => [V(t).xhsbjswich ? (r(),
                    d(l, {
                        key: 0,
                        onClick: c,
                        style: {
                            "margin-bottom": "10rpx"
                        }
                    }, {
                        default: S(( () => [Q(l, {
                            class: "flex flex-col flex-ac cards-min"
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                src: ce,
                                alt: ""
                            }), Q(l, {
                                class: "f-700",
                                style: {
                                    "margin-left": "10rpx",
                                    "font-size": "34rpx"
                                }
                            }, {
                                default: S(( () => [R("小红书笔记")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })) : T("", !0), V(t).dzdpswich ? (r(),
                    d(l, {
                        key: 1,
                        onClick: a[0] || (a[0] = e => p("大众点评")),
                        style: {
                            "margin-bottom": "10rpx"
                        }
                    }, {
                        default: S(( () => [Q(l, {
                            class: "flex flex-col flex-ac cards-min"
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                src: V(We),
                                alt: ""
                            }, null, 8, ["src"]), Q(l, {
                                class: "f-700",
                                style: {
                                    "margin-top": "10rpx",
                                    "font-size": "34rpx"
                                }
                            }, {
                                default: S(( () => [R("大众点评")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })) : T("", !0), V(t).dydpswich ? (r(),
                    d(l, {
                        key: 2,
                        onClick: a[1] || (a[1] = e => p("抖音点评")),
                        style: {
                            "margin-bottom": "10rpx"
                        }
                    }, {
                        default: S(( () => [Q(l, {
                            class: "flex flex-col flex-ac cards-min"
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                src: V(ie),
                                alt: ""
                            }, null, 8, ["src"]), Q(l, {
                                class: "f-700",
                                style: {
                                    "margin-top": "10rpx",
                                    "font-size": "34rpx"
                                }
                            }, {
                                default: S(( () => [R("抖音点评")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })) : T("", !0), V(t).gddpswich ? (r(),
                    d(l, {
                        key: 3,
                        onClick: a[2] || (a[2] = e => p("高德点评")),
                        style: {
                            "margin-bottom": "10rpx"
                        }
                    }, {
                        default: S(( () => [Q(l, {
                            class: "flex flex-col flex-ac cards-min"
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                src: V(ze),
                                alt: ""
                            }, null, 8, ["src"]), Q(l, {
                                class: "f-700",
                                style: {
                                    "margin-top": "10rpx",
                                    "font-size": "34rpx"
                                }
                            }, {
                                default: S(( () => [R("高德点评")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })) : T("", !0), V(t).mtdpswich ? (r(),
                    d(l, {
                        key: 4,
                        onClick: a[3] || (a[3] = e => p("美团点评")),
                        style: {
                            "margin-bottom": "10rpx"
                        }
                    }, {
                        default: S(( () => [Q(l, {
                            class: "flex flex-col flex-ac cards-min"
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                src: V(Pe),
                                alt: ""
                            }, null, 8, ["src"]), Q(l, {
                                class: "f-700",
                                style: {
                                    "margin-top": "10rpx",
                                    "font-size": "34rpx"
                                }
                            }, {
                                default: S(( () => [R("美团点评")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })) : T("", !0), V(t).xcdpswich ? (r(),
                    d(l, {
                        key: 5,
                        onClick: a[4] || (a[4] = e => p("携程点评")),
                        style: {
                            "margin-bottom": "10rpx"
                        }
                    }, {
                        default: S(( () => [Q(l, {
                            class: "flex flex-col flex-ac cards-min"
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                src: V(Ge),
                                alt: ""
                            }, null, 8, ["src"]), Q(l, {
                                class: "f-700",
                                style: {
                                    "margin-top": "10rpx",
                                    "font-size": "34rpx"
                                }
                            }, {
                                default: S(( () => [R("携程点评")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })) : T("", !0), V(t).xcdpswich ? (r(),
                    d(l, {
                        key: 6,
                        onClick: a[5] || (a[5] = e => p("携程笔记")),
                        style: {
                            "margin-bottom": "10rpx"
                        }
                    }, {
                        default: S(( () => [Q(l, {
                            class: "flex flex-col flex-ac cards-min"
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                src: V(Ge),
                                alt: ""
                            }, null, 8, ["src"]), Q(l, {
                                class: "f-700",
                                style: {
                                    "margin-top": "10rpx",
                                    "font-size": "34rpx"
                                }
                            }, {
                                default: S(( () => [R("携程笔记")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })) : T("", !0)])),
                    _: 1
                }), Q(y, {
                    show: s.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: a[8] || (a[8] = e => s.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(l, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(l, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(o, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(l, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(l, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(f.value.title), 1)])),
                                _: 1
                            }), Q(l, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(i, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "250rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(l, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(f.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(l, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(l, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(m, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: a[6] || (a[6] = e => {
                                            return t = f.value.content,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(l, {
                            style: {
                                "margin-bottom": "60rpx"
                            }
                        }, {
                            default: S(( () => [Q(l, {
                                class: "name"
                            }, {
                                default: S(( () => [R(" 评论图片 "), Q(g, {
                                    class: "baocun"
                                }, {
                                    default: S(( () => [R("长按图片可保存")])),
                                    _: 1
                                })])),
                                _: 1
                            }), Q(l, {
                                class: "card"
                            }, {
                                default: S(( () => [0 != f.value.srcList.length ? (r(),
                                d(i, {
                                    key: 0,
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "500rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(w, {
                                        border: !1
                                    }, {
                                        default: S(( () => [(r(!0),
                                        J(j, null, F(f.value.srcList, ( (e, t) => (r(),
                                        d(h, {
                                            key: t
                                        }, {
                                            default: S(( () => [L("img", {
                                                class: "card-img",
                                                src: e,
                                                onClick: e => ( (e, t) => {
                                                    Y({
                                                        current: t,
                                                        urls: e,
                                                        indicator: "default"
                                                    })
                                                }
                                                )(f.value.srcList, t),
                                                mode: "aspectFill",
                                                style: {
                                                    "-webkit-touch-callout": "default"
                                                }
                                            }, null, 8, ["src", "onClick"])])),
                                            _: 2
                                        }, 1024)))), 128))])),
                                        _: 1
                                    })])),
                                    _: 1
                                })) : (r(),
                                d(l, {
                                    key: 1,
                                    style: {
                                        display: "flex",
                                        "justify-content": "center"
                                    }
                                }, {
                                    default: S(( () => [L("img", {
                                        src: Te,
                                        style: {
                                            height: "130rpx"
                                        },
                                        mode: "heightFix"
                                    })])),
                                    _: 1
                                }))])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(x, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: a[7] || (a[7] = e => {
                                return "dydp" == (t = f.value.type) && Ve.shareDYDP(),
                                "dzdp" == t && Ve.shareDZDP(),
                                "gddp" == t && Ve.shareGDDP(),
                                "mtdp" == t && Ve.shareMTDP(),
                                "xcdp" == t && Ve.shareXCDP(),
                                void ("xcbj" == t && Ve.shareXCBJ());
                                var t
                            }
                            )
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-ba651b86"]])
  , Me = "" + new URL("wx3--tPhQQbd.png",import.meta.url).href
  , Je = "" + new URL("fpyq3-C-jTr4kj.png",import.meta.url).href
  , je = e({
    __name: "wxyx",
    setup(e) {
        const l = x();
        m([{
            title: "+ 加微信",
            img: Me
        }, {
            title: "发朋友圈",
            img: Je
        }]);
        const s = g("storeInfo")
          , i = m(!1)
          , p = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => i.value), (e => {
            p(!!e)
        }
        ));
        const f = m({
            type: "",
            title: "",
            content: "",
            srcList: ""
        })
          , w = m(!1)
          , y = N()
          , v = () => {
            "ios" == y.osName ? window.location.href = "weixin://scanqrcode" : window.location.href = "weixin://",
            w.value = !1
        }
          , A = () => {
            t({
                url: s.qun_img,
                success: e => {
                    200 === e.statusCode ? c({
                        filePath: e.tempFilePath,
                        success: function() {
                            n({
                                title: "保存成功",
                                duration: 2e3
                            })
                        },
                        fail: function() {
                            n({
                                title: "保存失败，请稍后重试",
                                icon: "none"
                            })
                        }
                    }) : n({
                        title: "下载失败，请稍后重试",
                        icon: "none"
                    })
                }
                ,
                fail: function() {
                    n({
                        title: "下载失败，请稍后重试",
                        icon: "none"
                    })
                }
            })
        }
          , E = async e => {
            if (!he()) {
                if ("+ 加微信" == e) {
                    if (0 == l.wxChannel)
                        return void Ve.shareJWX();
                    w.value = !0
                }
                if ("发朋友圈" == e) {
                    const e = await (async () => {
                        a({
                            title: "",
                            mask: !0
                        });
                        try {
                            const e = await h.get("/store/copywriting", {
                                params: {
                                    plat_id: s.plat_id,
                                    shop_id: s.shop_id,
                                    sid: s.sid,
                                    copywriter_type: "pyq"
                                }
                            });
                            if (console.log(e),
                            200 === e.data.code)
                                return e.data.data;
                            n({
                                icon: "none",
                                title: e.data.msg
                            })
                        } catch (e) {
                            console.log(e)
                        } finally {
                            o()
                        }
                    }
                    )();
                    null != e && ( (e, t, a) => {
                        f.value = {
                            type: t,
                            title: a,
                            content: e.title,
                            srcList: e.path
                        },
                        i.value = !0
                    }
                    )(e, "pyqdp", "朋友圈点评文案")
                }
            }
        }
        ;
        return (e, t) => {
            const a = u
              , o = C(I("up-modal"), D)
              , c = C(I("up-icon"), _)
              , p = P
              , m = C(I("up-text"), b)
              , g = C(I("up-button"), U)
              , h = C(I("up-popup"), B);
            return r(),
            d(a, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(a, {
                    class: "black-card"
                }, {
                    default: S(( () => [L("img", {
                        class: "jiantou",
                        src: oe,
                        alt: ""
                    }), L("img", {
                        class: "black-card-text",
                        src: "data:image/png;base64,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",
                        alt: ""
                    }), Q(a, {
                        class: "black-card-circle"
                    })])),
                    _: 1
                }), Q(a, {
                    class: "content-card flex flex-sb flex-wrap",
                    style: {
                        height: "160rpx"
                    }
                }, {
                    default: S(( () => [V(l).jwxswich ? (r(),
                    d(a, {
                        key: 0,
                        class: "flex flex-ac flex-jc",
                        onClick: t[0] || (t[0] = e => E("+ 加微信"))
                    }, {
                        default: S(( () => [Q(a, {
                            class: "flex flex-ac cards-min"
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                style: {
                                    width: "78rpx",
                                    height: "78rpx"
                                },
                                src: V(Me),
                                alt: ""
                            }, null, 8, ["src"]), Q(a, {
                                class: "f-700",
                                style: {
                                    "margin-left": "10rpx",
                                    "font-size": "34rpx"
                                }
                            }, {
                                default: S(( () => [R("+ 加微信")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })) : T("", !0), V(l).pyqswich ? (r(),
                    d(a, {
                        key: 1,
                        class: "flex flex-ac flex-jc",
                        onClick: t[1] || (t[1] = e => E("发朋友圈"))
                    }, {
                        default: S(( () => [Q(a, {
                            class: "flex flex-ac cards-min"
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                style: {
                                    width: "78rpx",
                                    height: "78rpx"
                                },
                                src: V(Je),
                                alt: ""
                            }, null, 8, ["src"]), Q(a, {
                                class: "f-700",
                                style: {
                                    "margin-left": "10rpx",
                                    "font-size": "34rpx"
                                }
                            }, {
                                default: S(( () => [R("发朋友圈")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })) : T("", !0)])),
                    _: 1
                }), Q(o, {
                    show: w.value,
                    title: "加微信",
                    confirmColor: "#439c5b",
                    onConfirm: v
                }, {
                    default: S(( () => [Q(a, {
                        class: ""
                    }, {
                        default: S(( () => [Q(a, {
                            style: {
                                "margin-bottom": "20upx"
                            }
                        }, {
                            default: S(( () => [L("img", {
                                class: "img",
                                src: V(s).qun_img,
                                mode: "aspectFit",
                                onLongtap: A
                            }, null, 40, ["src"])])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(h, {
                    show: i.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: t[4] || (t[4] = e => i.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(a, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(a, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(c, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(a, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(a, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(f.value.title), 1)])),
                                _: 1
                            }), Q(a, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(p, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "400rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(a, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(f.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(a, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(a, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(m, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: t[2] || (t[2] = e => {
                                            return t = f.value.content,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(g, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: t[3] || (t[3] = e => (f.value.type,
                            void (0 != l.wxChannel ? Ve.shareFPYQ() : Ve.shareSPH())))
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-64af34a8"]])
  , Fe = "" + new URL("mttg3-Cq1UA8g7.png",import.meta.url).href
  , Ye = "" + new URL("dzdptg3-BVsE92yy.png",import.meta.url).href
  , Ke = "" + new URL("dytg3-CxfQN6Nv.png",import.meta.url).href
  , Ne = e({
    __name: "sjtg",
    setup(e) {
        const t = x();
        return (e, a) => {
            const l = u;
            return r(),
            d(l, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(l, {
                    class: "black-card"
                }, {
                    default: S(( () => [L("img", {
                        class: "jiantou",
                        src: oe,
                        alt: ""
                    }), L("img", {
                        class: "black-card-text",
                        src: "data:image/png;base64,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",
                        alt: ""
                    }), Q(l, {
                        class: "black-card-circle"
                    })])),
                    _: 1
                }), Q(l, {
                    class: "content-card flex flex-sb flex-wrap",
                    style: {
                        height: "160rpx"
                    }
                }, {
                    default: S(( () => [Q(l, {
                        class: "cards-min flex flex-ac",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(t).mttgswich ? (r(),
                        d(l, {
                            key: 0,
                            class: "flex flex-ac flex-col",
                            style: {
                                width: "210rpx",
                                height: "160rpx",
                                position: "relative",
                                "margin-right": "9rpx"
                            },
                            onClick: a[0] || (a[0] = e => V(Ve).shareMTDP())
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                style: {
                                    width: "109rpx",
                                    height: "115rpx"
                                },
                                src: V(Fe),
                                alt: ""
                            }, null, 8, ["src"]), Q(l, {
                                class: "f-700 tuangou-btn"
                            }, {
                                default: S(( () => [R("美团团购")])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).dztgswich ? (r(),
                        d(l, {
                            key: 1,
                            class: "flex flex-ac flex-col",
                            style: {
                                width: "210rpx",
                                height: "160rpx",
                                position: "relative",
                                "margin-right": "9rpx"
                            },
                            onClick: a[1] || (a[1] = e => V(Ve).shareDZDP())
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                style: {
                                    width: "109rpx",
                                    height: "115rpx"
                                },
                                src: V(Ye),
                                alt: ""
                            }, null, 8, ["src"]), Q(l, {
                                class: "f-700 tuangou-btn",
                                style: {
                                    width: "185rpx"
                                }
                            }, {
                                default: S(( () => [R("大众点评团购")])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).dytgswich ? (r(),
                        d(l, {
                            key: 2,
                            class: "flex flex-ac flex-col",
                            style: {
                                width: "210rpx",
                                height: "160rpx",
                                position: "relative"
                            },
                            onClick: a[2] || (a[2] = e => V(Ve).shareDYDP())
                        }, {
                            default: S(( () => [L("img", {
                                class: "icon-min",
                                style: {
                                    width: "109rpx",
                                    height: "109rpx"
                                },
                                src: V(Ke),
                                alt: ""
                            }, null, 8, ["src"]), Q(l, {
                                class: "f-700 tuangou-btn"
                            }, {
                                default: S(( () => [R("抖音团购")])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-bd226f43"]])
  , Ze = "" + new URL("gzdy3-Dbhwvt6f.png",import.meta.url).href
  , He = "" + new URL("gzks3-4ndxpAzC.png",import.meta.url).href
  , qe = "" + new URL("gzxhs3-CDkSqEvV.png",import.meta.url).href
  , Xe = e({
    __name: "gzzh",
    setup(e) {
        const t = x();
        return (e, a) => {
            const l = u;
            return r(),
            d(l, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(l, {
                    class: "black-card"
                }, {
                    default: S(( () => [L("img", {
                        class: "jiantou",
                        src: oe,
                        alt: ""
                    }), L("img", {
                        class: "black-card-text",
                        src: "data:image/png;base64,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",
                        alt: ""
                    }), Q(l, {
                        class: "black-card-circle"
                    })])),
                    _: 1
                }), Q(l, {
                    class: "content-card flex flex-sb",
                    style: {
                        height: "240rpx"
                    }
                }, {
                    default: S(( () => [Q(l, {
                        class: "cards-min flex",
                        style: {
                            width: "100%",
                            height: "220rpx",
                            padding: "10rpx"
                        }
                    }, {
                        default: S(( () => [V(t).gzdyswich ? (r(),
                        d(l, {
                            key: 0,
                            class: "cards-gzdy",
                            onClick: a[0] || (a[0] = e => V(Ve).shareGZDY())
                        }, {
                            default: S(( () => [Q(l, {
                                class: "flex flex-col flex-ac",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-mins",
                                    src: V(Ze),
                                    alt: ""
                                }, null, 8, ["src"]), Q(l, {
                                    class: "f-700 gzdy-btn",
                                    style: {
                                        "margin-top": "10rpx"
                                    }
                                }, {
                                    default: S(( () => [R("+ 关注抖音")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).gzksswich ? (r(),
                        d(l, {
                            key: 1,
                            class: "cards-gzks",
                            onClick: a[1] || (a[1] = e => V(Ve).shareGZKS())
                        }, {
                            default: S(( () => [Q(l, {
                                class: "flex flex-col flex-ac",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-mins",
                                    src: V(He),
                                    alt: ""
                                }, null, 8, ["src"]), Q(l, {
                                    class: "f-700 gzks-btn",
                                    style: {
                                        "margin-top": "10rpx"
                                    }
                                }, {
                                    default: S(( () => [R("+ 关注快手")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).gzxhsswich ? (r(),
                        d(l, {
                            key: 2,
                            class: "cards-gzxhs",
                            onClick: a[2] || (a[2] = e => V(Ve).shareGZXHS())
                        }, {
                            default: S(( () => [Q(l, {
                                class: "flex flex-col flex-ac",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-mins",
                                    src: V(qe),
                                    alt: ""
                                }, null, 8, ["src"]), Q(l, {
                                    class: "f-700 gzxhs-btn",
                                    style: {
                                        "margin-top": "10rpx"
                                    }
                                }, {
                                    default: S(( () => [R("+ 关注小红书")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-3a47341e"]])
  , $e = e({
    __name: "wifi",
    setup(e) {
        const t = x()
          , a = m({});
        A(( () => {
            setTimeout(( () => {
                a.value = t.storeInfo
            }
            ), 500)
        }
        ));
        const l = m(!1)
          , s = () => {
            he() || (0 != t.wxChannel ? l.value = !0 : Ve.shareWIFI())
        }
        ;
        return (e, o) => {
            const i = u
              , c = C(I("up-icon"), _)
              , p = C(I("up-text"), b)
              , f = C(I("up-modal"), D);
            return r(),
            d(i, {
                class: "page"
            }, {
                default: S(( () => [V(t).wifiswich ? (r(),
                d(i, {
                    key: 0,
                    class: "wifi-bg"
                }, {
                    default: S(( () => [Q(i, {
                        class: "flex flex-sb flex-ac",
                        style: {
                            height: "100%",
                            padding: "0 30rpx"
                        }
                    }, {
                        default: S(( () => [Q(i, {
                            class: ""
                        }, {
                            default: S(( () => [Q(i, {
                                class: ""
                            }, {
                                default: S(( () => [R(W(a.value.wifi_name), 1)])),
                                _: 1
                            }), Q(i, {
                                class: ""
                            }, {
                                default: S(( () => [R(W(a.value.name), 1)])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(i, {
                            class: "wifi-btn",
                            onClick: s
                        }, {
                            default: S(( () => [Q(c, {
                                name: "wifi",
                                size: "22"
                            }), Q(i, {
                                class: ""
                            }, {
                                default: S(( () => [R("点击连接")])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                })) : T("", !0), Q(f, {
                    show: l.value,
                    title: "连wifi",
                    confirmColor: "#439c5b",
                    onConfirm: o[1] || (o[1] = e => l.value = !1)
                }, {
                    default: S(( () => [Q(i, null, {
                        default: S(( () => [Q(i, {
                            class: ""
                        }, {
                            default: S(( () => [R("wifi名称: " + W(a.value.wifi_name), 1)])),
                            _: 1
                        }), Q(i, {
                            style: {
                                "margin-top": "20rpx",
                                display: "flex"
                            }
                        }, {
                            default: S(( () => [R(" wifi密码: " + W(a.value.wifi_pwd) + " ", 1), Q(i, {
                                style: {
                                    "margin-left": "30rpx"
                                }
                            }, {
                                default: S(( () => [Q(p, {
                                    text: "复制密码",
                                    color: "#439c5b",
                                    onClick: o[0] || (o[0] = e => {
                                        return t = a.value.wifi_pwd,
                                        void z({
                                            data: String(t),
                                            success: function() {
                                                n({
                                                    title: "复制成功",
                                                    icon: "none",
                                                    duration: 2e3
                                                })
                                            },
                                            fail: function() {
                                                n({
                                                    title: "复制失败,请检查权限",
                                                    icon: "none",
                                                    duration: 2e3
                                                }),
                                                console.log("复制失败")
                                            }
                                        });
                                        var t
                                    }
                                    )
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-6703e4f3"]])
  , et = e({
    __name: "yhtg",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m([]);
        A(( () => {
            setTimeout(( () => {
                a.value = t.storeInfo,
                (async () => {
                    try {
                        const e = await h.get("/store/GrouPurchase", {
                            params: {
                                suid: a.value.sid
                            }
                        });
                        200 === e.data.code && (l.value = e.data.data)
                    } catch (e) {
                        console.log(e)
                    }
                }
                )()
            }
            ), 500)
        }
        ));
        return (e, t) => {
            const a = u
              , s = C(I("up-scroll-list"), Z);
            return r(),
            d(a, {
                class: "page"
            }, {
                default: S(( () => [0 != l.value.length ? (r(),
                d(s, {
                    key: 0,
                    indicator: !1
                }, {
                    default: S(( () => [(r(!0),
                    J(j, null, F(l.value, ( (e, t) => (r(),
                    d(a, {
                        key: t
                    }, {
                        default: S(( () => [Q(a, {
                            class: "flex yhtg-card",
                            style: {
                                width: "610rpx",
                                "margin-right": "20rpx"
                            }
                        }, {
                            default: S(( () => [L("img", {
                                class: "yhtg-img",
                                src: e.goods_img
                            }, null, 8, ["src"]), Q(a, {
                                class: "flex flex-col flex-sb",
                                style: {
                                    "margin-left": "20rpx",
                                    flex: "1"
                                }
                            }, {
                                default: S(( () => [Q(a, null, {
                                    default: S(( () => [Q(a, {
                                        class: "f-700"
                                    }, {
                                        default: S(( () => [R(W(e.goods_name), 1)])),
                                        _: 2
                                    }, 1024), Q(a, {
                                        class: "flex flex-sb flex-ac"
                                    }, {
                                        default: S(( () => [Q(a, {
                                            class: "",
                                            style: {
                                                "margin-top": "10rpx",
                                                "font-size": "22rpx",
                                                "background-color": "#f0f0f0",
                                                padding: "0 10rpx",
                                                "text-align": "center",
                                                "border-radius": "10rpx",
                                                color: "#aeaeae"
                                            }
                                        }, {
                                            default: S(( () => [R(W(e.goods_label), 1)])),
                                            _: 2
                                        }, 1024), Q(a, {
                                            style: {
                                                "font-size": "22rpx",
                                                color: "#ccc"
                                            }
                                        }, {
                                            default: S(( () => [R("已售" + W(e.sell_num), 1)])),
                                            _: 2
                                        }, 1024)])),
                                        _: 2
                                    }, 1024)])),
                                    _: 2
                                }, 1024), Q(a, {
                                    class: "flex flex-sb"
                                }, {
                                    default: S(( () => [Q(a, {
                                        class: "flex",
                                        style: {
                                            "align-items": "flex-end"
                                        }
                                    }, {
                                        default: S(( () => [Q(a, {
                                            class: ""
                                        }, {
                                            default: S(( () => [L("span", {
                                                style: {
                                                    color: "#fc304f",
                                                    "font-size": "22rpx"
                                                }
                                            }, "¥"), L("span", {
                                                style: {
                                                    color: "#fc304f",
                                                    "font-size": "32rpx"
                                                }
                                            }, W(e.market_price), 1)])),
                                            _: 2
                                        }, 1024), Q(a, {
                                            style: {
                                                "margin-left": "10rpx",
                                                position: "relative"
                                            },
                                            class: "line"
                                        }, {
                                            default: S(( () => [L("span", {
                                                style: {
                                                    color: "#cccccc",
                                                    "font-size": "22rpx"
                                                }
                                            }, "¥"), L("span", {
                                                style: {
                                                    color: "#cccccc",
                                                    "font-size": "22rpx"
                                                }
                                            }, W(e.original_price), 1)])),
                                            _: 2
                                        }, 1024), Q(a, {
                                            class: "discount"
                                        }, {
                                            default: S(( () => [R(W(Number(e.market_price / e.original_price * 10).toFixed(1)) + "折", 1)])),
                                            _: 2
                                        }, 1024)])),
                                        _: 2
                                    }, 1024), Q(a, {
                                        class: "yhtg-btn",
                                        onClick: t => (e => {
                                            if (he())
                                                return;
                                            const t = new URL(`snssdk1128://poi/goodsdetail/?activity_id=${e.goods_link}`);
                                            window.location.href = t
                                        }
                                        )(e)
                                    }, {
                                        default: S(( () => [R("立即购买")])),
                                        _: 2
                                    }, 1032, ["onClick"])])),
                                    _: 2
                                }, 1024)])),
                                _: 2
                            }, 1024)])),
                            _: 2
                        }, 1024)])),
                        _: 2
                    }, 1024)))), 128))])),
                    _: 1
                })) : T("", !0)])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-54a2f460"]])
  , tt = "" + new URL("15-xXET-Nml.png",import.meta.url).href
  , at = e({
    __name: "index",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m(!0)
          , s = m(!0)
          , o = m(!0)
          , i = m(!0)
          , n = m(!0);
        H(( () => {
            t.dyswich || t.ksswich || t.sphswich || t.xhsswich ? l.value = !0 : l.value = !1,
            t.dzdpswich || t.dydpswich || t.gddpswich || t.mtdpswich || t.xhsbjswich ? s.value = !0 : s.value = !1,
            t.jwxswich || t.pyqswich ? o.value = !0 : o.value = !1,
            t.mttgswich || t.dztgswich || t.dytgswich ? i.value = !0 : i.value = !1,
            t.gzdyswich || t.gzksswich || t.gzxhsswich ? n.value = !0 : n.value = !1,
            a.value = t.storeInfo
        }
        ));
        const c = () => {
            Y({
                urls: [a.value.show_img]
            })
        }
          , p = () => {
            he() || (window.location.href = a.value.web_path)
        }
        ;
        return (e, t) => {
            const f = u
              , m = C(I("up-avatar"), q)
              , g = K
              , h = te
              , w = C(I("up-button"), U);
            return r(),
            d(f, {
                class: "page-three"
            }, {
                default: S(( () => [a.value.bgImg ? (r(),
                d(f, {
                    key: 0,
                    class: "back-img",
                    style: X({
                        backgroundImage: `url(${a.value.bgImg})`
                    })
                }, null, 8, ["style"])) : (r(),
                d(f, {
                    key: 1,
                    class: "back-img",
                    style: X({
                        backgroundImage: `url(${V(tt)})`
                    })
                }, null, 8, ["style"])), Q(f, {
                    class: "avatar"
                }, {
                    default: S(( () => [Q(g, null, {
                        default: S(( () => [Q(m, {
                            src: a.value.logo,
                            size: "40"
                        }, null, 8, ["src"])])),
                        _: 1
                    }), Q(g, {
                        class: "title"
                    }, {
                        default: S(( () => [R(W(a.value.name), 1)])),
                        _: 1
                    })])),
                    _: 1
                }), Q(f, {
                    class: "content"
                }, {
                    default: S(( () => [l.value ? (r(),
                    d(f, {
                        key: 0,
                        class: ""
                    }, {
                        default: S(( () => [Q(Re)])),
                        _: 1
                    })) : T("", !0), s.value ? (r(),
                    d(f, {
                        key: 1,
                        style: {
                            "margin-top": "30upx"
                        }
                    }, {
                        default: S(( () => [Q(Oe)])),
                        _: 1
                    })) : T("", !0), o.value ? (r(),
                    d(f, {
                        key: 2,
                        style: {
                            "margin-top": "30upx"
                        }
                    }, {
                        default: S(( () => [Q(je)])),
                        _: 1
                    })) : T("", !0), i.value ? (r(),
                    d(f, {
                        key: 3,
                        style: {
                            "margin-top": "30upx"
                        }
                    }, {
                        default: S(( () => [Q(Ne)])),
                        _: 1
                    })) : T("", !0), n.value ? (r(),
                    d(f, {
                        key: 4,
                        style: {
                            "margin-top": "30upx"
                        }
                    }, {
                        default: S(( () => [Q(Xe)])),
                        _: 1
                    })) : T("", !0), Q(f, {
                        style: {
                            "margin-top": "30upx"
                        }
                    }, {
                        default: S(( () => [Q($e)])),
                        _: 1
                    }), Q(f, {
                        style: {
                            "margin-top": "30upx"
                        }
                    }, {
                        default: S(( () => [Q(et)])),
                        _: 1
                    }), Q(f, {
                        class: "content-card-gd"
                    }, {
                        default: S(( () => [Q(f, {
                            class: "flex"
                        }, {
                            default: S(( () => [Q(h, {
                                class: "gd-img",
                                src: null != a.value.custom_icon ? a.value.custom_icon : "/static/Three/gdimg.png"
                            }, null, 8, ["src"]), Q(f, {
                                class: "",
                                style: {
                                    "margin-left": "10upx",
                                    display: "flex",
                                    "flex-direction": "column",
                                    "justify-content": "center"
                                }
                            }, {
                                default: S(( () => [Q(f, {
                                    style: {
                                        "margin-bottom": "15upx",
                                        "font-weight": "600"
                                    }
                                }, {
                                    default: S(( () => [R(W(null != a.value.custom_title ? a.value.custom_title : "更多"), 1)])),
                                    _: 1
                                }), Q(f, {
                                    style: {
                                        color: "gray",
                                        "font-size": "12px"
                                    }
                                }, {
                                    default: S(( () => [R(W(null != a.value.custom_describe ? a.value.custom_describe : ""), 1)])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), $(Q(f, null, {
                            default: S(( () => [$(Q(w, {
                                text: null != a.value.custom_text ? a.value.custom_text : "点击跳转",
                                shape: "circle",
                                color: "#439c5b",
                                style: {
                                    height: "50upx"
                                },
                                onClick: t[0] || (t[0] = e => V(Ve).shareGD(a.value.appid, a.value.skip_path))
                            }, null, 8, ["text"]), [[ee, 0 == a.value.more_set]]), $(Q(w, {
                                text: null != a.value.custom_text ? a.value.custom_text : "更多",
                                shape: "circle",
                                color: "#439c5b",
                                style: {
                                    height: "50upx"
                                },
                                onClick: c
                            }, null, 8, ["text"]), [[ee, 1 == a.value.more_set]]), $(Q(w, {
                                text: null != a.value.custom_text ? a.value.custom_text : "跳转网页",
                                shape: "circle",
                                color: "#439c5b",
                                style: {
                                    height: "50upx"
                                },
                                onClick: p
                            }, null, 8, ["text"]), [[ee, 2 == a.value.more_set]])])),
                            _: 1
                        }, 512), [[ee, null != a.value.more_set]])])),
                        _: 1
                    }), Q(f, {
                        class: "footer"
                    }, {
                        default: S(( () => [R(" 本产品使用其他企业、组织的品牌名、商标、LOGO 仅用于客观说明产品的功能及适用场景，旨在帮助用户更清晰地了解产品的适配范围与使用价值，无任何恶意，亦不构成对相关品牌的背书、关联或混淆，相关权利均归原权利人所有。如涉及侵权，请及时联系我们，我们将立即采取措施予以纠正。 ")])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-af828426"]])
  , lt = "" + new URL("icon_bg-BuyKL_zX.png",import.meta.url).href
  , st = "" + new URL("icon_fsp-C8p1pCEX.png",import.meta.url).href
  , ot = e({
    __name: "fsp",
    setup(e) {
        const l = x()
          , s = m(!1)
          , i = m("")
          , c = () => {
            const e = window.localStorage.getItem("share_id");
            null != e && (a({
                mask: !0
            }),
            h.get(`/store/couponShow/${e}`).then((e => {
                200 === e.data.code ? i.value = e.data.data.qrcode : n({
                    title: e.data.msg,
                    icon: "none"
                })
            }
            )).catch((e => {
                console.log(e)
            }
            )).finally(( () => {
                o(),
                s.value = !0
            }
            )))
        }
          , p = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , f = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , V = m({});
        A(( () => {
            c(),
            setTimeout(( () => {
                V.value = l.storeInfo;
                const e = new URLSearchParams(window.location.search);
                "kuaishou" == e.get("type") && w({
                    title: "提示",
                    content: "点击确定发布视频",
                    showCancel: !1,
                    success: () => {
                        window.location.href = `${window.location.origin}/store/kuaishouOauth?plat_id=${V.value.plat_id}&url=${encodeURIComponent(window.location.href)}`
                    }
                }),
                "publish" == e.get("action") && (a({
                    mask: !0,
                    title: "发布视频中"
                }),
                h.get(`${window.location.origin}/store/kuaishouh5?suid=${V.value.sid}&shop_id=${V.value.shop_id}&plat_id=${V.value.plat_id}&fans=${g("fans")}`).then((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    }),
                    o()
                }
                )).catch((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    })
                }
                )))
            }
            ), 500)
        }
        ));
        const O = m(!1)
          , M = m([{
            name: "发抖音",
            imgUrl: "/static/test/dy.png",
            show: l.dyswich
        }, {
            name: "发小红书",
            imgUrl: "/static/test/xhs.png",
            show: l.xhsswich
        }, {
            name: "发视频号",
            imgUrl: "/static/test/sph.png",
            show: l.sphswich
        }, {
            name: "发快手",
            imgUrl: "/static/test/ks.png",
            show: l.ksswich
        }])
          , Y = m("")
          , N = m("")
          , Z = m("")
          , H = (e, l) => {
            a({
                mask: !0
            }),
            t({
                url: e.videoUrl,
                success: t => {
                    if (200 === t.statusCode) {
                        o();
                        const a = t.tempFilePath
                          , l = document.createElement("a");
                        l.download = e.title,
                        l.href = a,
                        document.body.appendChild(l),
                        l.click(),
                        l.remove()
                    }
                }
                ,
                fail: e => {
                    n({
                        title: e,
                        icon: "none"
                    })
                }
            })
        }
          , q = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => [O.value, s.value]), (e => {
            e[0] || e[1] ? q(!0) : q(!1)
        }
        ));
        const X = () => {
            O.value = !1,
            Y.value = "",
            N.value = ""
        }
          , ae = () => {
            window.location.href = "weixin://"
        }
          , le = () => {
            "visible" === document.visibilityState ? console.log("用户进入浏览器") : console.log("用户退出浏览器")
        }
        ;
        return y(( () => {
            c(),
            document.addEventListener("visibilitychange", le)
        }
        )),
        v(( () => {
            document.removeEventListener("visibilitychange", le)
        }
        )),
        (e, t) => {
            const l = te
              , m = K
              , g = u
              , x = C(I("up-icon"), _)
              , y = P
              , v = C(I("up-text"), b)
              , A = G
              , k = C(I("up-button"), U)
              , q = C(I("up-popup"), B)
              , le = C(I("ss-download"), se)
              , oe = C(I("up-image"), E)
              , ie = C(I("up-modal"), D);
            return r(),
            d(g, {
                class: "page_box"
            }, {
                default: S(( () => [Q(g, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(g, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(l, {
                            class: "item_img",
                            src: st,
                            mode: ""
                        }), Q(m, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("发视频")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(g, {
                        class: "item_list1_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(M.value, ( (e, t) => $((r(),
                        d(g, {
                            class: "item_list1",
                            key: t,
                            onClick: t => (async e => {
                                switch (console.log(e),
                                e) {
                                case "发抖音":
                                    Ve.shareDY();
                                    break;
                                case "发小红书":
                                    Ve.shareXHS();
                                    break;
                                case "发视频号":
                                    if (he())
                                        return;
                                    a({
                                        mask: !0
                                    });
                                    try {
                                        const e = await h.get("/store/douyinVideo", {
                                            params: {
                                                suid: V.value.sid,
                                                plat_id: V.value.plat_id,
                                                shop_id: V.value.shop_id
                                            }
                                        });
                                        200 === e.data.code ? (o(),
                                        Y.value = e.data.data,
                                        Z.value = e.data.data.desc,
                                        O.value = !0) : n({
                                            icon: "none",
                                            title: e.data.msg
                                        })
                                    } catch (t) {
                                        console.log(t)
                                    }
                                    break;
                                case "发快手":
                                    Ve.shareKS()
                                }
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(g, {
                                class: "list1_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(l, {
                                class: "list1_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                }), Q(q, {
                    show: O.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: X,
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(g, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(g, {
                            class: "icon",
                            onClick: t[0] || (t[0] = e => O.value = !1)
                        }, {
                            default: S(( () => [Q(x, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(g, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(g, {
                                class: "name"
                            }, {
                                default: S(( () => [R("视频号文案")])),
                                _: 1
                            }), Q(g, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(y, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "200rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(g, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(Z.value), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(g, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(g, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(v, {
                                        text: "复制文案",
                                        align: "right",
                                        color: "#439c5b",
                                        onClick: t[1] || (t[1] = e => {
                                            return t = Z.value,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(g, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(A, {
                                style: {
                                    width: "100%",
                                    height: "400rpx"
                                },
                                src: Y.value.videoUrl,
                                "show-center-play-btn": !1,
                                poster: `${Y.value.videoUrl}?x-oss-process=video/snapshot,t_14321,f_jpg,w_0,h_0,ar_h`
                            }, null, 8, ["src", "poster"])])),
                            _: 1
                        }), Q(g, {
                            style: {
                                display: "flex"
                            }
                        }, {
                            default: S(( () => [Q(k, {
                                text: "保存视频",
                                shape: "circle",
                                onClick: t[2] || (t[2] = e => {
                                    return t = Y.value,
                                    void (we() ? w({
                                        title: "下载提示",
                                        content: "点击确定后视频将下载到浏览器，您可以点击下方地址栏中下载按钮打开视频，点击分享按钮存储视频，即可保存到相册中",
                                        confirmColor: "#439c5b",
                                        success(e) {
                                            e.confirm && H(t)
                                        }
                                    }) : H(t));
                                    var t
                                }
                                ),
                                style: {
                                    "margin-right": "15px"
                                }
                            }), Q(k, {
                                text: "去点评",
                                shape: "circle",
                                color: "#439c5b",
                                onClick: ae
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(le, {
                    ref: "ssdownload",
                    fileUrl: Y.value,
                    fileType: N.value
                }, null, 8, ["fileUrl", "fileType"]), Q(ie, {
                    show: s.value,
                    title: "提示",
                    "show-cancel-button": "",
                    onCancel: p,
                    onConfirm: f
                }, {
                    default: S(( () => [Q(g, {
                        style: {
                            display: "flex",
                            "flex-direction": "column",
                            "align-items": "center"
                        }
                    }, {
                        default: S(( () => [Q(g, {
                            style: {
                                color: "gray",
                                "margin-bottom": "20upx",
                                "text-align": "center"
                            }
                        }, {
                            default: S(( () => [R(W("" != i.value ? "视频发布成功，建议截图保存二维码" : "获取失败，可手动获取尝试") + " ", 1), L("br"), R(" (长按也可保存) ")])),
                            _: 1
                        }), Q(oe, {
                            "show-loading": !0,
                            src: i.value,
                            width: "200px",
                            height: "200px"
                        }, null, 8, ["src"]), "" == i.value ? (r(),
                        d(g, {
                            key: 0,
                            style: {
                                "margin-top": "30upx",
                                width: "100%"
                            }
                        }, {
                            default: S(( () => [Q(k, {
                                text: "手动获取",
                                color: "#439c5b",
                                onClick: c
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-3db5a623"]])
  , it = "" + new URL("icon_gzzh-CQMbij60.png",import.meta.url).href
  , nt = e({
    __name: "gzzh",
    setup(e) {
        const t = x()
          , a = m([{
            name: "抖音",
            imgUrl: "/static/test/icon_dy.png",
            show: t.gzdyswich
        }, {
            name: "快手",
            imgUrl: "/static/test/icon_ks.png",
            show: t.gzksswich
        }, {
            name: "小红书",
            imgUrl: "/static/test/icon_xhs.png",
            show: t.gzxhsswich
        }]);
        return (e, t) => {
            const l = te
              , s = K
              , o = u;
            return r(),
            d(o, {
                class: "page_box"
            }, {
                default: S(( () => [Q(o, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(o, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(l, {
                            class: "item_img",
                            src: it,
                            mode: ""
                        }), Q(s, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("关注账号")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(o, {
                        class: "item_list2_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(a.value, ( (e, t) => $((r(),
                        d(o, {
                            class: "item_list2",
                            key: t,
                            onClick: t => (e => {
                                switch (e) {
                                case "抖音":
                                    Ve.shareGZDY();
                                    break;
                                case "快手":
                                    Ve.shareGZKS();
                                    break;
                                case "小红书":
                                    Ve.shareGZXHS()
                                }
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(o, {
                                class: "list2_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(l, {
                                class: "list2_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-6aac433f"]])
  , ct = "" + new URL("icon_dpdk-BuTz01QX.png",import.meta.url).href
  , rt = e({
    __name: "dpdk",
    setup(e) {
        const t = x();
        g("storeInfo");
        const l = async e => {
            if (!he()) {
                a({
                    title: "",
                    mask: !0
                });
                try {
                    const a = await h.get("/store/copywriting", {
                        params: {
                            plat_id: t.storeInfo.plat_id,
                            shop_id: t.storeInfo.shop_id,
                            sid: t.storeInfo.sid,
                            copywriter_type: e
                        }
                    });
                    if (200 === a.data.code)
                        return a.data.data;
                    n({
                        icon: "none",
                        title: a.data.msg
                    })
                } catch (l) {
                    console.log(l)
                } finally {
                    o()
                }
            }
        }
          , s = m(!1)
          , i = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => s.value), (e => {
            i(!!e)
        }
        ));
        const c = m([{
            name: "小红书",
            imgUrl: "/static/test/xhs.png",
            show: t.xhsbjswich
        }, {
            name: "大众点评",
            imgUrl: "/static/test/icon_dz.png",
            show: t.dzdpswich
        }, {
            name: "抖音点评",
            imgUrl: "/static/test/icon_dy.png",
            show: t.dydpswich
        }, {
            name: "高德点评",
            imgUrl: "/static/test/icon_gd.png",
            show: t.gddpswich
        }, {
            name: "美团点评",
            imgUrl: "/static/test/icon_mt.png",
            show: t.mtdpswich
        }, {
            name: "携程点评",
            imgUrl: "/static/xiecheng.png",
            show: t.xcdpswich
        }, {
            name: "携程笔记",
            imgUrl: "/static/xiecheng.png",
            show: t.xcdpswich
        }])
          , p = m({
            type: "",
            title: "",
            content: "",
            srcList: []
        })
          , f = (e, t, a) => {
            if (null != e && ("" == e.path || e.path),
            null == e)
                return "dydp" == t && Ve.shareDYDP(),
                "dzdp" == t && Ve.shareDZDP(),
                "gddp" == t && Ve.shareGDDP(),
                "mtdp" == t && Ve.shareMTDP(),
                "xcdp" == t && Ve.shareXCDP(),
                void ("xcbj" == t && Ve.shareXCBJ());
            setTimeout(( () => {
                p.value = {
                    type: t,
                    title: a,
                    content: e.title,
                    srcList: e.path
                }
            }
            ), 500),
            s.value = !0
        }
        ;
        return (e, t) => {
            const a = te
              , o = K
              , i = u
              , m = C(I("up-icon"), _)
              , g = P
              , h = C(I("up-text"), b)
              , w = C(I("up-grid-item"), O)
              , x = C(I("up-grid"), M)
              , y = C(I("up-button"), U)
              , v = C(I("up-popup"), B);
            return r(),
            d(i, {
                class: "page_box"
            }, {
                default: S(( () => [Q(i, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(i, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(a, {
                            class: "item_img",
                            src: ct,
                            mode: ""
                        }), Q(o, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("点评打卡 + 笔记")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(i, {
                        class: "item_list1_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(c.value, ( (e, t) => $((r(),
                        d(i, {
                            class: "item_list1",
                            key: t,
                            onClick: t => (async e => {
                                if ("大众点评" == e) {
                                    const e = await l("dzdp");
                                    null != e && f(e, "dzdp", "大众点评文案")
                                }
                                if ("抖音点评" == e) {
                                    const e = await l("dydp");
                                    null != e && f(e, "dydp", "抖音点评文案")
                                }
                                if ("高德点评" == e) {
                                    const e = await l("mtdp");
                                    null != e && f(e, "gddp", "高德点评文案")
                                }
                                if ("美团点评" == e) {
                                    const e = await l("mtdp");
                                    null != e && f(e, "mtdp", "美团点评文案")
                                }
                                if ("携程点评" == e) {
                                    const e = await l("xcwa");
                                    null != e && f(e, "xcdp", "携程点评文案")
                                }
                                if ("携程笔记" == e) {
                                    const e = await l("xcwa");
                                    null != e && f(e, "xcbj", "携程笔记文案")
                                }
                                "小红书" == e && Ve.shareXHSBJ()
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(i, {
                                class: "list1_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(a, {
                                class: "list1_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                }), Q(v, {
                    show: s.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: t[2] || (t[2] = e => s.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(i, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(i, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(m, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(i, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(i, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(p.value.title), 1)])),
                                _: 1
                            }), Q(i, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(g, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "250rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(i, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(p.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(i, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(i, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(h, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: t[0] || (t[0] = e => {
                                            return t = p.value.content,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(i, {
                            style: {
                                "margin-bottom": "60rpx"
                            }
                        }, {
                            default: S(( () => [Q(i, {
                                class: "name"
                            }, {
                                default: S(( () => [R(" 评论图片 "), Q(o, {
                                    class: "baocun"
                                }, {
                                    default: S(( () => [R("长按图片可保存")])),
                                    _: 1
                                })])),
                                _: 1
                            }), Q(i, {
                                class: "card"
                            }, {
                                default: S(( () => [0 != p.value.srcList.length ? (r(),
                                d(g, {
                                    key: 0,
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "500rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(x, {
                                        border: !1,
                                        onClick: e.click
                                    }, {
                                        default: S(( () => [(r(!0),
                                        J(j, null, F(p.value.srcList, ( (e, t) => (r(),
                                        d(w, {
                                            key: t
                                        }, {
                                            default: S(( () => [L("img", {
                                                class: "card-img",
                                                src: e,
                                                onClick: e => ( (e, t) => {
                                                    Y({
                                                        current: t,
                                                        urls: e,
                                                        indicator: "default"
                                                    })
                                                }
                                                )(p.value.srcList, t),
                                                mode: "aspectFill"
                                            }, null, 8, ["src", "onClick"])])),
                                            _: 2
                                        }, 1024)))), 128))])),
                                        _: 1
                                    }, 8, ["onClick"])])),
                                    _: 1
                                })) : (r(),
                                d(i, {
                                    key: 1,
                                    style: {
                                        display: "flex",
                                        "justify-content": "center"
                                    }
                                }, {
                                    default: S(( () => [L("img", {
                                        src: Te,
                                        style: {
                                            height: "130rpx"
                                        },
                                        mode: "heightFix"
                                    })])),
                                    _: 1
                                }))])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(y, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: t[1] || (t[1] = e => {
                                return "dydp" == (t = p.value.type) && Ve.shareDYDP(),
                                "dzdp" == t && Ve.shareDZDP(),
                                "gddp" == t && Ve.shareGDDP(),
                                "mtdp" == t && Ve.shareMTDP(),
                                "xcdp" == t && Ve.shareXCDP(),
                                void ("xcbj" == t && Ve.shareXCBJ());
                                var t
                            }
                            )
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-7ef48c6b"]])
  , dt = "data:image/png;base64,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"
  , ut = e({
    __name: "sjtg",
    setup(e) {
        const t = x()
          , a = m([{
            name: "美团",
            imgUrl: "/static/test/mt.png",
            show: t.mttgswich
        }, {
            name: "大众",
            imgUrl: "/static/test/icon_dz.png",
            show: t.dztgswich
        }, {
            name: "抖音",
            imgUrl: "/static/test/icon_dy.png",
            show: t.dytgswich
        }]);
        return (e, t) => {
            const l = te
              , s = K
              , o = u;
            return r(),
            d(o, {
                class: "page_box"
            }, {
                default: S(( () => [Q(o, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(o, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(l, {
                            class: "item_img",
                            src: dt,
                            mode: ""
                        }), Q(s, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("商家团购")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(o, {
                        class: "item_list2_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(a.value, ( (e, t) => $((r(),
                        d(o, {
                            class: "item_list2",
                            key: t,
                            onClick: t => (e => {
                                switch (e) {
                                case "美团":
                                    Ve.shareMTDP();
                                    break;
                                case "大众":
                                    Ve.shareDZDP();
                                    break;
                                case "抖音":
                                    Ve.shareDYDP()
                                }
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(o, {
                                class: "list2_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(l, {
                                class: "list2_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-5963e4d5"]])
  , pt = "data:image/png;base64,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"
  , ft = e({
    __name: "wxyx",
    setup(e) {
        const t = x()
          , l = m([{
            name: "加微信",
            imgUrl: "/static/test/icon_wx.png",
            show: t.jwxswich
        }, {
            name: "发朋友圈",
            imgUrl: "/static/Three/fpyq3.png",
            show: t.pyqswich
        }, {
            name: "连Wi-Fi",
            imgUrl: "/static/test/icon_wifi.png",
            show: t.wifiswich
        }])
          , s = m(!1)
          , i = g("storeInfo")
          , c = async () => {
            a({
                title: "",
                mask: !0
            });
            try {
                const e = await h.get("/store/copywriting", {
                    params: {
                        plat_id: i.plat_id,
                        shop_id: i.shop_id,
                        sid: i.sid,
                        copywriter_type: "pyq"
                    }
                });
                if (console.log(e),
                200 === e.data.code)
                    return e.data.data;
                n({
                    icon: "none",
                    title: e.data.msg
                })
            } catch (e) {
                console.log(e)
            } finally {
                o()
            }
        }
          , p = m(!1)
          , f = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => p.value), (e => {
            f(!!e)
        }
        ));
        const w = m({
            type: "",
            title: "",
            content: "",
            srcList: ""
        })
          , y = (e, t, a) => {
            w.value = {
                type: t,
                title: a,
                content: e.title,
                srcList: e.path
            },
            p.value = !0
        }
          , v = m(!1);
        N();
        const A = e => {
            z({
                data: String(e),
                success: function() {
                    n({
                        title: "复制成功",
                        icon: "none",
                        duration: 2e3
                    })
                },
                fail: function() {
                    n({
                        title: "复制失败,请检查权限",
                        icon: "none",
                        duration: 2e3
                    }),
                    console.log("复制失败")
                }
            })
        }
        ;
        return (e, a) => {
            const o = te
              , n = K
              , f = u
              , m = C(I("up-icon"), _)
              , g = P
              , h = C(I("up-text"), b)
              , x = C(I("up-button"), U)
              , k = C(I("up-popup"), B)
              , E = C(I("up-modal"), D);
            return r(),
            d(f, {
                class: "page_box"
            }, {
                default: S(( () => [Q(f, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(f, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(o, {
                            class: "item_img",
                            src: pt,
                            mode: ""
                        }), Q(n, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("微信营销")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(f, {
                        class: "item_list3_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(l.value, ( (e, a) => $((r(),
                        d(f, {
                            class: "item_list3",
                            key: a,
                            onClick: a => (async e => {
                                if (!he())
                                    switch (e) {
                                    case "加微信":
                                        if (0 == t.wxChannel)
                                            return void Ve.shareJWX();
                                        v.value = !0;
                                        break;
                                    case "发朋友圈":
                                        const e = await c();
                                        null != e && y(e, "pyqdp", "朋友圈点评文案");
                                        break;
                                    case "连Wi-Fi":
                                        if (0 == t.wxChannel)
                                            return void Ve.shareWIFI();
                                        s.value = !0
                                    }
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(f, {
                                class: "list3_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(o, {
                                class: "list3_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                }), Q(k, {
                    show: p.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: a[2] || (a[2] = e => p.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(f, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(f, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(m, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(f, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(f, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(w.value.title), 1)])),
                                _: 1
                            }), Q(f, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(g, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "400rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(f, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(w.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(f, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(f, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(h, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: a[0] || (a[0] = e => A(w.value.content)),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(x, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: a[1] || (a[1] = e => (w.value.type,
                            void (0 != t.wxChannel ? Ve.shareFPYQ() : Ve.shareSPH())))
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(E, {
                    show: s.value,
                    title: "连wifi",
                    confirmColor: "#439c5b",
                    onConfirm: a[4] || (a[4] = e => s.value = !1)
                }, {
                    default: S(( () => [Q(f, null, {
                        default: S(( () => [Q(f, {
                            class: ""
                        }, {
                            default: S(( () => [R("wifi名称: " + W(V(i).wifi_name), 1)])),
                            _: 1
                        }), Q(f, {
                            style: {
                                "margin-top": "20rpx",
                                display: "flex"
                            }
                        }, {
                            default: S(( () => [R(" wifi密码: " + W(V(i).wifi_pwd) + " ", 1), Q(f, {
                                style: {
                                    "margin-left": "30rpx"
                                }
                            }, {
                                default: S(( () => [Q(h, {
                                    text: "复制密码",
                                    color: "#439c5b",
                                    onClick: a[3] || (a[3] = e => A(V(i).wifi_pwd))
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-7a029833"]])
  , mt = "" + new URL("icon_q-Bs-TNEWV.png",import.meta.url).href
  , gt = e({
    __name: "yhtg",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m([]);
        A(( () => {
            setTimeout(( () => {
                a.value = t.storeInfo,
                (async () => {
                    try {
                        const e = await h.get("/store/GrouPurchase", {
                            params: {
                                suid: a.value.sid
                            }
                        });
                        200 === e.data.code && (l.value = e.data.data)
                    } catch (e) {
                        console.log(e)
                    }
                }
                )()
            }
            ), 500)
        }
        ));
        return (e, t) => {
            const a = te
              , s = u
              , o = K
              , i = P;
            return 0 != l.value.length ? (r(),
            d(i, {
                key: 0,
                "scroll-x": "true",
                class: "scroll_content"
            }, {
                default: S(( () => [(r(!0),
                J(j, null, F(l.value, ( (e, t) => (r(),
                d(s, {
                    class: "page_bottom_wrap",
                    key: t
                }, {
                    default: S(( () => [Q(s, {
                        class: "page_bottom"
                    }, {
                        default: S(( () => [Q(s, {
                            class: "page_l"
                        }, {
                            default: S(( () => [Q(a, {
                                class: "page_limg",
                                src: e.goods_img,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1024), Q(s, {
                            class: "page_r"
                        }, {
                            default: S(( () => [Q(s, {
                                class: "item_title"
                            }, {
                                default: S(( () => [R(W(e.goods_name), 1)])),
                                _: 2
                            }, 1024), Q(s, {
                                class: "item_title2"
                            }, {
                                default: S(( () => [Q(s, {
                                    class: "title2_l"
                                }, {
                                    default: S(( () => [R(W(e.goods_label), 1)])),
                                    _: 2
                                }, 1024), Q(s, {
                                    class: "title2_r"
                                }, {
                                    default: S(( () => [R("已售" + W(e.sell_num), 1)])),
                                    _: 2
                                }, 1024)])),
                                _: 2
                            }, 1024), Q(s, {
                                class: "item_bottom"
                            }, {
                                default: S(( () => [Q(a, {
                                    class: "bottom_imgs",
                                    src: mt,
                                    mode: "aspectFit",
                                    onClick: t => (e => {
                                        if (he())
                                            return;
                                        const t = new URL(`snssdk1128://poi/goodsdetail/?activity_id=${e.goods_link}`);
                                        window.location.href = t
                                    }
                                    )(e)
                                }, null, 8, ["onClick"]), Q(o, {
                                    class: "bottom_current"
                                }, {
                                    default: S(( () => [R("¥" + W(e.market_price), 1)])),
                                    _: 2
                                }, 1024), Q(o, {
                                    class: "bottom_original"
                                }, {
                                    default: S(( () => [R("¥" + W(e.original_price), 1)])),
                                    _: 2
                                }, 1024)])),
                                _: 2
                            }, 1024)])),
                            _: 2
                        }, 1024)])),
                        _: 2
                    }, 1024)])),
                    _: 2
                }, 1024)))), 128))])),
                _: 1
            })) : T("", !0)
        }
    }
}, [["__scopeId", "data-v-b616b8f6"]])
  , ht = e({
    __name: "index",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m(!0)
          , s = m(!0)
          , o = m(!0)
          , i = m(!0)
          , n = m(!0);
        H(( () => {
            t.dyswich || t.ksswich || t.sphswich || t.xhsswich ? l.value = !0 : l.value = !1,
            t.dzdpswich || t.dydpswich || t.gddpswich || t.mtdpswich || t.xhsbjswich ? s.value = !0 : s.value = !1,
            t.jwxswich || t.pyqswich ? o.value = !0 : o.value = !1,
            t.mttgswich || t.dztgswich || t.dytgswich ? i.value = !0 : i.value = !1,
            t.gzdyswich || t.gzksswich || t.gzxhsswich ? n.value = !0 : n.value = !1,
            a.value = t.storeInfo
        }
        ));
        const c = () => {
            Y({
                urls: [a.value.show_img]
            })
        }
          , p = () => {
            he() || (window.location.href = a.value.web_path)
        }
        ;
        return (e, t) => {
            const f = te
              , m = u
              , g = C(I("up-button"), U);
            return r(),
            d(m, {
                class: "page_wrap"
            }, {
                default: S(( () => [a.value.bgImg ? (r(),
                d(f, {
                    key: 1,
                    class: "page_bgs",
                    src: a.value.bgImg
                }, null, 8, ["src"])) : (r(),
                d(f, {
                    key: 0,
                    class: "page_bgs",
                    src: lt
                })), Q(m, {
                    class: "page_container"
                }, {
                    default: S(( () => [Q(m, {
                        class: "page_header"
                    }, {
                        default: S(( () => [Q(m, {
                            class: "page_title"
                        }, {
                            default: S(( () => [R(W(a.value.name), 1)])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(m, {
                        class: "page_content"
                    }, {
                        default: S(( () => [l.value ? (r(),
                        d(m, {
                            key: 0,
                            class: ""
                        }, {
                            default: S(( () => [Q(ot)])),
                            _: 1
                        })) : T("", !0), n.value ? (r(),
                        d(m, {
                            key: 1
                        }, {
                            default: S(( () => [Q(nt)])),
                            _: 1
                        })) : T("", !0), s.value ? (r(),
                        d(m, {
                            key: 2
                        }, {
                            default: S(( () => [Q(rt)])),
                            _: 1
                        })) : T("", !0), i.value ? (r(),
                        d(m, {
                            key: 3
                        }, {
                            default: S(( () => [Q(ut)])),
                            _: 1
                        })) : T("", !0), o.value ? (r(),
                        d(m, {
                            key: 4
                        }, {
                            default: S(( () => [Q(ft)])),
                            _: 1
                        })) : T("", !0), Q(m, {
                            style: {
                                "margin-top": "30upx"
                            }
                        }, {
                            default: S(( () => [Q(gt)])),
                            _: 1
                        }), Q(m, {
                            class: "content-card-gd"
                        }, {
                            default: S(( () => [Q(m, {
                                class: "flex"
                            }, {
                                default: S(( () => [Q(f, {
                                    class: "gd-img",
                                    src: null != a.value.custom_icon ? a.value.custom_icon : "/static/Three/gdimg.png"
                                }, null, 8, ["src"]), Q(m, {
                                    class: "",
                                    style: {
                                        "margin-left": "10upx",
                                        display: "flex",
                                        "flex-direction": "column",
                                        "justify-content": "center"
                                    }
                                }, {
                                    default: S(( () => [Q(m, {
                                        style: {
                                            "margin-bottom": "15upx",
                                            "font-weight": "600"
                                        }
                                    }, {
                                        default: S(( () => [R(W(null != a.value.custom_title ? a.value.custom_title : "更多"), 1)])),
                                        _: 1
                                    }), Q(m, {
                                        style: {
                                            color: "gray",
                                            "font-size": "12px"
                                        }
                                    }, {
                                        default: S(( () => [R(W(null != a.value.custom_describe ? a.value.custom_describe : ""), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            }), $(Q(m, {
                                class: ""
                            }, {
                                default: S(( () => [$(Q(g, {
                                    text: null != a.value.custom_text ? a.value.custom_text : "点击跳转",
                                    shape: "circle",
                                    color: "#439c5b",
                                    style: {
                                        height: "50upx"
                                    },
                                    onClick: t[0] || (t[0] = e => V(Ve).shareGD(a.value.appid, a.value.skip_path))
                                }, null, 8, ["text"]), [[ee, 0 == a.value.more_set]]), $(Q(g, {
                                    text: null != a.value.custom_text ? a.value.custom_text : "更多",
                                    shape: "circle",
                                    color: "#439c5b",
                                    style: {
                                        height: "50upx"
                                    },
                                    onClick: c
                                }, null, 8, ["text"]), [[ee, 1 == a.value.more_set]]), $(Q(g, {
                                    text: null != a.value.custom_text ? a.value.custom_text : "跳转网页",
                                    shape: "circle",
                                    color: "#439c5b",
                                    style: {
                                        height: "50upx"
                                    },
                                    onClick: p
                                }, null, 8, ["text"]), [[ee, 2 == a.value.more_set]])])),
                                _: 1
                            }, 512), [[ee, null != a.value.more_set]])])),
                            _: 1
                        }), Q(m, {
                            class: "footer"
                        }, {
                            default: S(( () => [R(" 本产品使用其他企业、组织的品牌名、商标、LOGO 仅用于客观说明产品的功能及适用场景，旨在帮助用户更清晰地了解产品的适配范围与使用价值，无任何恶意，亦不构成对相关品牌的背书、关联或混淆，相关权利均归原权利人所有。如涉及侵权，请及时联系我们，我们将立即采取措施予以纠正。 ")])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-b4417f5f"]])
  , wt = "" + new URL("icon_h-BJMm4Mm8.png",import.meta.url).href
  , xt = e({
    __name: "fsp",
    setup(e) {
        const l = x()
          , s = m(!1)
          , i = m("")
          , c = () => {
            const e = window.localStorage.getItem("share_id");
            null != e && (a({
                mask: !0
            }),
            h.get(`/store/couponShow/${e}`).then((e => {
                200 === e.data.code ? i.value = e.data.data.qrcode : n({
                    title: e.data.msg,
                    icon: "none"
                })
            }
            )).catch((e => {
                console.log(e)
            }
            )).finally(( () => {
                o(),
                s.value = !0
            }
            )))
        }
          , p = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , f = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , V = m({});
        A(( () => {
            c(),
            setTimeout(( () => {
                V.value = l.storeInfo;
                const e = new URLSearchParams(window.location.search);
                "kuaishou" == e.get("type") && w({
                    title: "提示",
                    content: "点击确定发布视频",
                    showCancel: !1,
                    success: () => {
                        window.location.href = `${window.location.origin}/store/kuaishouOauth?plat_id=${V.value.plat_id}&url=${encodeURIComponent(window.location.href)}`
                    }
                }),
                "publish" == e.get("action") && (a({
                    mask: !0,
                    title: "发布视频中"
                }),
                h.get(`${window.location.origin}/store/kuaishouh5?suid=${V.value.sid}&shop_id=${V.value.shop_id}&plat_id=${V.value.plat_id}&fans=${g("fans")}`).then((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    }),
                    o()
                }
                )).catch((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    })
                }
                )))
            }
            ), 500)
        }
        ));
        const O = m(!1)
          , M = m([{
            name: "发抖音",
            imgUrl: "/static/test/dy.png",
            show: l.dyswich
        }, {
            name: "发小红书",
            imgUrl: "/static/test/xhs.png",
            show: l.xhsswich
        }, {
            name: "发视频号",
            imgUrl: "/static/test/sph.png",
            show: l.sphswich
        }, {
            name: "发快手",
            imgUrl: "/static/test/ks.png",
            show: l.ksswich
        }])
          , Y = m("")
          , N = m("")
          , Z = m("")
          , H = (e, l) => {
            a({
                mask: !0
            }),
            t({
                url: e.videoUrl,
                success: t => {
                    if (200 === t.statusCode) {
                        o();
                        const a = t.tempFilePath
                          , l = document.createElement("a");
                        l.download = e.title,
                        l.href = a,
                        document.body.appendChild(l),
                        l.click(),
                        l.remove()
                    }
                }
                ,
                fail: e => {
                    n({
                        title: e,
                        icon: "none"
                    })
                }
            })
        }
          , q = () => {
            window.location.href = "weixin://"
        }
          , X = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => [O.value, s.value]), (e => {
            e[0] || e[1] ? X(!0) : X(!1)
        }
        ));
        const ae = () => {
            O.value = !1,
            Y.value = "",
            N.value = ""
        }
          , le = () => {
            "visible" === document.visibilityState ? console.log("用户进入浏览器") : console.log("用户退出浏览器")
        }
        ;
        return y(( () => {
            c(),
            document.addEventListener("visibilitychange", le)
        }
        )),
        v(( () => {
            document.removeEventListener("visibilitychange", le)
        }
        )),
        (e, t) => {
            const l = te
              , m = K
              , g = u
              , x = C(I("up-icon"), _)
              , y = P
              , v = C(I("up-text"), b)
              , A = G
              , k = C(I("up-button"), U)
              , X = C(I("up-popup"), B)
              , le = C(I("ss-download"), se)
              , oe = C(I("up-image"), E)
              , ie = C(I("up-modal"), D);
            return r(),
            d(g, {
                class: "page_box"
            }, {
                default: S(( () => [Q(g, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(g, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(l, {
                            class: "item_img",
                            src: st,
                            mode: ""
                        }), Q(m, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("发视频")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(g, {
                        class: "item_list1_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(M.value, ( (e, t) => $((r(),
                        d(g, {
                            class: "item_list1",
                            key: t,
                            onClick: t => (async e => {
                                switch (console.log(e),
                                e) {
                                case "发抖音":
                                    Ve.shareDY();
                                    break;
                                case "发小红书":
                                    Ve.shareXHS();
                                    break;
                                case "发视频号":
                                    if (he())
                                        return;
                                    a({
                                        mask: !0
                                    });
                                    try {
                                        const e = await h.get("/store/douyinVideo", {
                                            params: {
                                                suid: V.value.sid,
                                                plat_id: V.value.plat_id,
                                                shop_id: V.value.shop_id
                                            }
                                        });
                                        200 === e.data.code ? (o(),
                                        Y.value = e.data.data,
                                        Z.value = e.data.data.desc,
                                        O.value = !0) : n({
                                            icon: "none",
                                            title: e.data.msg
                                        })
                                    } catch (t) {
                                        console.log(t)
                                    }
                                    break;
                                case "发快手":
                                    Ve.shareKS()
                                }
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(g, {
                                class: "list1_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(l, {
                                class: "list1_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                }), Q(X, {
                    show: O.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: ae,
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(g, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(g, {
                            class: "icon",
                            onClick: t[0] || (t[0] = e => O.value = !1)
                        }, {
                            default: S(( () => [Q(x, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(g, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(g, {
                                class: "name"
                            }, {
                                default: S(( () => [R("视频号文案")])),
                                _: 1
                            }), Q(g, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(y, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "200rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(g, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(Z.value), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(g, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(g, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(v, {
                                        text: "复制文案",
                                        align: "right",
                                        color: "#439c5b",
                                        onClick: t[1] || (t[1] = e => {
                                            return t = Z.value,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(g, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(A, {
                                style: {
                                    width: "100%",
                                    height: "400rpx"
                                },
                                src: Y.value.videoUrl,
                                "show-center-play-btn": !1,
                                poster: `${Y.value.videoUrl}?x-oss-process=video/snapshot,t_14321,f_jpg,w_0,h_0,ar_h`
                            }, null, 8, ["src", "poster"])])),
                            _: 1
                        }), Q(g, {
                            style: {
                                display: "flex"
                            }
                        }, {
                            default: S(( () => [Q(k, {
                                text: "保存视频",
                                shape: "circle",
                                onClick: t[2] || (t[2] = e => {
                                    return t = Y.value,
                                    void (we() ? w({
                                        title: "下载提示",
                                        content: "点击确定后视频将下载到浏览器，您可以点击下方地址栏中下载按钮打开视频，点击分享按钮存储视频，即可保存到相册中",
                                        confirmColor: "#439c5b",
                                        success(e) {
                                            e.confirm && H(t)
                                        }
                                    }) : H(t));
                                    var t
                                }
                                ),
                                style: {
                                    "margin-right": "15px"
                                }
                            }), Q(k, {
                                text: "去点评",
                                shape: "circle",
                                color: "#439c5b",
                                onClick: q
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(le, {
                    ref: "ssdownload",
                    fileUrl: Y.value,
                    fileType: N.value
                }, null, 8, ["fileUrl", "fileType"]), Q(ie, {
                    show: s.value,
                    title: "提示",
                    "show-cancel-button": "",
                    onCancel: p,
                    onConfirm: f
                }, {
                    default: S(( () => [Q(g, {
                        style: {
                            display: "flex",
                            "flex-direction": "column",
                            "align-items": "center"
                        }
                    }, {
                        default: S(( () => [Q(g, {
                            style: {
                                color: "gray",
                                "margin-bottom": "20upx",
                                "text-align": "center"
                            }
                        }, {
                            default: S(( () => [R(W("" != i.value ? "视频发布成功，建议截图保存二维码" : "获取失败，可手动获取尝试") + " ", 1), L("br"), R(" (长按也可保存) ")])),
                            _: 1
                        }), Q(oe, {
                            "show-loading": !0,
                            src: i.value,
                            width: "200px",
                            height: "200px"
                        }, null, 8, ["src"]), "" == i.value ? (r(),
                        d(g, {
                            key: 0,
                            style: {
                                "margin-top": "30upx",
                                width: "100%"
                            }
                        }, {
                            default: S(( () => [Q(k, {
                                text: "手动获取",
                                color: "#439c5b",
                                onClick: c
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-77ee8d3f"]])
  , yt = e({
    __name: "gzzh",
    setup(e) {
        const t = x()
          , a = m([{
            name: "抖音",
            imgUrl: "/static/test/icon_dy.png",
            show: t.gzdyswich
        }, {
            name: "快手",
            imgUrl: "/static/test/icon_ks.png",
            show: t.gzksswich
        }, {
            name: "小红书",
            imgUrl: "/static/test/icon_xhs.png",
            show: t.gzxhsswich
        }]);
        return (e, t) => {
            const l = te
              , s = K
              , o = u;
            return r(),
            d(o, {
                class: "page_box"
            }, {
                default: S(( () => [Q(o, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(o, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(l, {
                            class: "item_img",
                            src: it,
                            mode: ""
                        }), Q(s, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("关注账号")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(o, {
                        class: "item_list2_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(a.value, ( (e, t) => $((r(),
                        d(o, {
                            class: "item_list2",
                            key: t,
                            onClick: t => (e => {
                                switch (e) {
                                case "抖音":
                                    Ve.shareGZDY();
                                    break;
                                case "快手":
                                    Ve.shareGZKS();
                                    break;
                                case "小红书":
                                    Ve.shareGZXHS()
                                }
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(o, {
                                class: "list2_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(l, {
                                class: "list2_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-1869d8dd"]])
  , vt = e({
    __name: "dpdk",
    setup(e) {
        const t = x();
        g("storeInfo");
        const l = async e => {
            if (!he()) {
                a({
                    title: "",
                    mask: !0
                });
                try {
                    const a = await h.get("/store/copywriting", {
                        params: {
                            plat_id: t.storeInfo.plat_id,
                            shop_id: t.storeInfo.shop_id,
                            sid: t.storeInfo.sid,
                            copywriter_type: e
                        }
                    });
                    if (200 === a.data.code)
                        return a.data.data;
                    n({
                        icon: "none",
                        title: a.data.msg
                    })
                } catch (l) {
                    console.log(l)
                } finally {
                    o()
                }
            }
        }
          , s = m(!1)
          , i = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => s.value), (e => {
            i(!!e)
        }
        ));
        const c = m([{
            name: "小红书笔记",
            imgUrl: "/static/test/xhs.png",
            show: t.xhsbjswich
        }, {
            name: "大众点评",
            imgUrl: "/static/test/icon_dz.png",
            show: t.dzdpswich
        }, {
            name: "抖音点评",
            imgUrl: "/static/test/icon_dy.png",
            show: t.dydpswich
        }, {
            name: "高德点评",
            imgUrl: "/static/test/icon_gd.png",
            show: t.gddpswich
        }, {
            name: "美团点评",
            imgUrl: "/static/test/icon_mt.png",
            show: t.mtdpswich
        }])
          , p = m({
            type: "",
            title: "",
            content: "",
            srcList: []
        })
          , f = (e, t, a) => {
            if (null != e && ("" == e.path || e.path),
            null == e)
                return "dydp" == t && Ve.shareDYDP(),
                "dzdp" == t && Ve.shareDZDP(),
                "gddp" == t && Ve.shareGDDP(),
                void ("mtdp" == t && Ve.shareMTDP());
            setTimeout(( () => {
                p.value = {
                    type: t,
                    title: a,
                    content: e.title,
                    srcList: e.path
                }
            }
            ), 500),
            s.value = !0
        }
        ;
        return (e, t) => {
            const a = te
              , o = K
              , i = u
              , m = C(I("up-icon"), _)
              , g = P
              , h = C(I("up-text"), b)
              , w = C(I("up-grid-item"), O)
              , x = C(I("up-grid"), M)
              , y = C(I("up-button"), U)
              , v = C(I("up-popup"), B);
            return r(),
            d(i, {
                class: "page_box"
            }, {
                default: S(( () => [Q(i, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(i, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(a, {
                            class: "item_img",
                            src: ct,
                            mode: ""
                        }), Q(o, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("点评打卡 + 笔记")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(i, {
                        class: "item_list1_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(c.value, ( (e, t) => $((r(),
                        d(i, {
                            class: "item_list1",
                            key: t,
                            onClick: t => (async e => {
                                if ("大众点评" == e) {
                                    const e = await l("dzdp");
                                    null != e && f(e, "dzdp", "大众点评文案")
                                }
                                if ("抖音点评" == e) {
                                    const e = await l("dydp");
                                    null != e && f(e, "dydp", "抖音点评文案")
                                }
                                if ("高德点评" == e) {
                                    const e = await l("mtdp");
                                    null != e && f(e, "gddp", "高德点评文案")
                                }
                                if ("美团点评" == e) {
                                    const e = await l("mtdp");
                                    null != e && f(e, "mtdp", "美团点评文案")
                                }
                                "小红书" == e && Ve.shareXHSBJ()
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(i, {
                                class: "list1_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(a, {
                                class: "list1_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                }), Q(v, {
                    show: s.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: t[2] || (t[2] = e => s.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(i, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(i, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(m, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(i, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(i, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(p.value.title), 1)])),
                                _: 1
                            }), Q(i, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(g, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "250rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(i, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(p.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(i, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(i, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(h, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: t[0] || (t[0] = e => {
                                            return t = p.value.content,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(i, {
                            style: {
                                "margin-bottom": "60rpx"
                            }
                        }, {
                            default: S(( () => [Q(i, {
                                class: "name"
                            }, {
                                default: S(( () => [R(" 评论图片 "), Q(o, {
                                    class: "baocun"
                                }, {
                                    default: S(( () => [R("长按图片可保存")])),
                                    _: 1
                                })])),
                                _: 1
                            }), Q(i, {
                                class: "card"
                            }, {
                                default: S(( () => [0 != p.value.srcList.length ? (r(),
                                d(g, {
                                    key: 0,
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "500rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(x, {
                                        border: !1,
                                        onClick: e.click
                                    }, {
                                        default: S(( () => [(r(!0),
                                        J(j, null, F(p.value.srcList, ( (e, t) => (r(),
                                        d(w, {
                                            key: t
                                        }, {
                                            default: S(( () => [L("img", {
                                                class: "card-img",
                                                src: e,
                                                onClick: e => ( (e, t) => {
                                                    Y({
                                                        current: t,
                                                        urls: e,
                                                        indicator: "default"
                                                    })
                                                }
                                                )(p.value.srcList, t),
                                                mode: "aspectFill"
                                            }, null, 8, ["src", "onClick"])])),
                                            _: 2
                                        }, 1024)))), 128))])),
                                        _: 1
                                    }, 8, ["onClick"])])),
                                    _: 1
                                })) : (r(),
                                d(i, {
                                    key: 1,
                                    style: {
                                        display: "flex",
                                        "justify-content": "center"
                                    }
                                }, {
                                    default: S(( () => [L("img", {
                                        src: Te,
                                        style: {
                                            height: "130rpx"
                                        },
                                        mode: "heightFix"
                                    })])),
                                    _: 1
                                }))])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(y, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: t[1] || (t[1] = e => {
                                return "dydp" == (t = p.value.type) && Ve.shareDYDP(),
                                "dzdp" == t && Ve.shareDZDP(),
                                "gddp" == t && Ve.shareGDDP(),
                                void ("mtdp" == t && Ve.shareMTDP());
                                var t
                            }
                            )
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-cdd25cb7"]])
  , At = e({
    __name: "sjtg",
    setup(e) {
        const t = x()
          , a = m([{
            name: "美团",
            imgUrl: "/static/test/mt.png",
            show: t.mttgswich
        }, {
            name: "大众",
            imgUrl: "/static/test/icon_dz.png",
            show: t.dztgswich
        }, {
            name: "抖音",
            imgUrl: "/static/test/icon_dy.png",
            show: t.dytgswich
        }]);
        return (e, t) => {
            const l = te
              , s = K
              , o = u;
            return r(),
            d(o, {
                class: "page_box"
            }, {
                default: S(( () => [Q(o, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(o, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(l, {
                            class: "item_img",
                            src: dt,
                            mode: ""
                        }), Q(s, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("商家团购")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(o, {
                        class: "item_list2_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(a.value, ( (e, t) => $((r(),
                        d(o, {
                            class: "item_list2",
                            key: t,
                            onClick: t => (e => {
                                switch (e) {
                                case "美团":
                                    Ve.shareMTDP();
                                    break;
                                case "大众":
                                    Ve.shareDZDP();
                                    break;
                                case "抖音":
                                    Ve.shareDYDP()
                                }
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(o, {
                                class: "list2_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(l, {
                                class: "list2_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-bd294c53"]])
  , kt = e({
    __name: "wxyx",
    setup(e) {
        const t = x()
          , l = m([{
            name: "加微信",
            imgUrl: "/static/test/icon_wx.png",
            show: t.jwxswich
        }, {
            name: "发朋友圈",
            imgUrl: "/static/test/icon_pyq.png",
            show: t.pyqswich
        }, {
            name: "连Wi-Fi",
            imgUrl: "/static/test/icon_wifi.png",
            show: t.wifiswich
        }])
          , s = m(!1)
          , i = g("storeInfo")
          , c = async () => {
            a({
                title: "",
                mask: !0
            });
            try {
                const e = await h.get("/store/copywriting", {
                    params: {
                        plat_id: i.plat_id,
                        shop_id: i.shop_id,
                        sid: i.sid,
                        copywriter_type: "pyq"
                    }
                });
                if (console.log(e),
                200 === e.data.code)
                    return e.data.data;
                n({
                    icon: "none",
                    title: e.data.msg
                })
            } catch (e) {
                console.log(e)
            } finally {
                o()
            }
        }
          , p = m(!1)
          , f = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => p.value), (e => {
            f(!!e)
        }
        ));
        const w = m({
            type: "",
            title: "",
            content: "",
            srcList: ""
        })
          , y = (e, t, a) => {
            w.value = {
                type: t,
                title: a,
                content: e.title,
                srcList: e.path
            },
            p.value = !0
        }
          , v = m(!1);
        N();
        const A = e => {
            z({
                data: String(e),
                success: function() {
                    n({
                        title: "复制成功",
                        icon: "none",
                        duration: 2e3
                    })
                },
                fail: function() {
                    n({
                        title: "复制失败,请检查权限",
                        icon: "none",
                        duration: 2e3
                    }),
                    console.log("复制失败")
                }
            })
        }
        ;
        return (e, a) => {
            const o = te
              , n = K
              , f = u
              , m = C(I("up-icon"), _)
              , g = P
              , h = C(I("up-text"), b)
              , x = C(I("up-button"), U)
              , k = C(I("up-popup"), B)
              , E = C(I("up-modal"), D);
            return r(),
            d(f, {
                class: "page_box"
            }, {
                default: S(( () => [Q(f, {
                    class: "page_item"
                }, {
                    default: S(( () => [Q(f, {
                        class: "item_top"
                    }, {
                        default: S(( () => [Q(o, {
                            class: "item_img",
                            src: pt,
                            mode: ""
                        }), Q(n, {
                            class: "item_text"
                        }, {
                            default: S(( () => [R("微信营销")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(f, {
                        class: "item_list3_wrap"
                    }, {
                        default: S(( () => [(r(!0),
                        J(j, null, F(l.value, ( (e, a) => $((r(),
                        d(f, {
                            class: "item_list3",
                            key: a,
                            onClick: a => (async e => {
                                if (!he())
                                    switch (e) {
                                    case "加微信":
                                        if (0 == t.wxChannel)
                                            return void Ve.shareJWX();
                                        v.value = !0;
                                        break;
                                    case "发朋友圈":
                                        const e = await c();
                                        null != e && y(e, "pyqdp", "朋友圈点评文案");
                                        break;
                                    case "连Wi-Fi":
                                        if (0 == t.wxChannel)
                                            return void Ve.shareWIFI();
                                        s.value = !0
                                    }
                            }
                            )(e.name)
                        }, {
                            default: S(( () => [Q(f, {
                                class: "list3_top"
                            }, {
                                default: S(( () => [R(W(e.name), 1)])),
                                _: 2
                            }, 1024), Q(o, {
                                class: "list3_img",
                                src: e.imgUrl,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1032, ["onClick"])), [[ee, e.show]]))), 128))])),
                        _: 1
                    })])),
                    _: 1
                }), Q(k, {
                    show: p.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: a[2] || (a[2] = e => p.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(f, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(f, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(m, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(f, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(f, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(w.value.title), 1)])),
                                _: 1
                            }), Q(f, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(g, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "400rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(f, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(w.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(f, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(f, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(h, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: a[0] || (a[0] = e => A(w.value.content)),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(x, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: a[1] || (a[1] = e => (w.value.type,
                            void (0 != t.wxChannel ? Ve.shareFPYQ() : Ve.shareSPH())))
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(E, {
                    show: s.value,
                    title: "连wifi",
                    confirmColor: "#439c5b",
                    onConfirm: a[4] || (a[4] = e => s.value = !1)
                }, {
                    default: S(( () => [Q(f, null, {
                        default: S(( () => [Q(f, {
                            class: ""
                        }, {
                            default: S(( () => [R("wifi名称: " + W(V(i).wifi_name), 1)])),
                            _: 1
                        }), Q(f, {
                            style: {
                                "margin-top": "20rpx",
                                display: "flex"
                            }
                        }, {
                            default: S(( () => [R(" wifi密码: " + W(V(i).wifi_pwd) + " ", 1), Q(f, {
                                style: {
                                    "margin-left": "30rpx"
                                }
                            }, {
                                default: S(( () => [Q(h, {
                                    text: "复制密码",
                                    color: "#439c5b",
                                    onClick: a[3] || (a[3] = e => A(V(i).wifi_pwd))
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-9f460b33"]])
  , Ct = e({
    __name: "yhtg",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m([]);
        A(( () => {
            setTimeout(( () => {
                a.value = t.storeInfo,
                (async () => {
                    try {
                        const e = await h.get("/store/GrouPurchase", {
                            params: {
                                suid: a.value.sid
                            }
                        });
                        200 === e.data.code && (l.value = e.data.data)
                    } catch (e) {
                        console.log(e)
                    }
                }
                )()
            }
            ), 500)
        }
        ));
        return (e, t) => {
            const a = te
              , s = u
              , o = K
              , i = P;
            return 0 != l.value.length ? (r(),
            d(i, {
                key: 0,
                "scroll-x": "true",
                class: "scroll_content"
            }, {
                default: S(( () => [(r(!0),
                J(j, null, F(l.value, ( (e, t) => (r(),
                d(s, {
                    class: "page_bottom_wrap",
                    key: t
                }, {
                    default: S(( () => [Q(s, {
                        class: "page_bottom"
                    }, {
                        default: S(( () => [Q(s, {
                            class: "page_l"
                        }, {
                            default: S(( () => [Q(a, {
                                class: "page_limg",
                                src: e.goods_img,
                                mode: ""
                            }, null, 8, ["src"])])),
                            _: 2
                        }, 1024), Q(s, {
                            class: "page_r"
                        }, {
                            default: S(( () => [Q(s, {
                                class: "item_title"
                            }, {
                                default: S(( () => [R(W(e.goods_name), 1)])),
                                _: 2
                            }, 1024), Q(s, {
                                class: "item_title2"
                            }, {
                                default: S(( () => [Q(s, {
                                    class: "title2_l"
                                }, {
                                    default: S(( () => [R(W(e.goods_label), 1)])),
                                    _: 2
                                }, 1024), Q(s, {
                                    class: "title2_r"
                                }, {
                                    default: S(( () => [R("已售" + W(e.sell_num), 1)])),
                                    _: 2
                                }, 1024)])),
                                _: 2
                            }, 1024), Q(s, {
                                class: "item_bottom"
                            }, {
                                default: S(( () => [Q(a, {
                                    class: "bottom_imgs",
                                    src: mt,
                                    mode: "aspectFit",
                                    onClick: t => (e => {
                                        if (he())
                                            return;
                                        const t = new URL(`snssdk1128://poi/goodsdetail/?activity_id=${e.goods_link}`);
                                        window.location.href = t
                                    }
                                    )(e)
                                }, null, 8, ["onClick"]), Q(o, {
                                    class: "bottom_current"
                                }, {
                                    default: S(( () => [R("¥" + W(e.market_price), 1)])),
                                    _: 2
                                }, 1024), Q(o, {
                                    class: "bottom_original"
                                }, {
                                    default: S(( () => [R("¥" + W(e.original_price), 1)])),
                                    _: 2
                                }, 1024)])),
                                _: 2
                            }, 1024)])),
                            _: 2
                        }, 1024)])),
                        _: 2
                    }, 1024)])),
                    _: 2
                }, 1024)))), 128))])),
                _: 1
            })) : T("", !0)
        }
    }
}, [["__scopeId", "data-v-5782492f"]])
  , _t = e({
    __name: "indexs",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m(!0)
          , s = m(!0)
          , o = m(!0)
          , i = m(!0)
          , n = m(!0);
        H(( () => {
            t.dyswich || t.ksswich || t.sphswich || t.xhsswich ? l.value = !0 : l.value = !1,
            t.dzdpswich || t.dydpswich || t.gddpswich || t.mtdpswich || t.xhsbjswich ? s.value = !0 : s.value = !1,
            t.jwxswich || t.pyqswich ? o.value = !0 : o.value = !1,
            t.mttgswich || t.dztgswich || t.dytgswich ? i.value = !0 : i.value = !1,
            t.gzdyswich || t.gzksswich || t.gzxhsswich ? n.value = !0 : n.value = !1,
            a.value = t.storeInfo
        }
        ));
        const c = () => {
            Y({
                urls: [a.value.show_img]
            })
        }
          , p = () => {
            he() || (window.location.href = a.value.web_path)
        }
        ;
        return (e, t) => {
            const f = te
              , m = u
              , g = C(I("up-button"), U);
            return r(),
            d(m, {
                class: "page_wrap"
            }, {
                default: S(( () => [Q(f, {
                    class: "page_bgs",
                    src: lt
                }), Q(m, {
                    class: "page_container"
                }, {
                    default: S(( () => [Q(m, {
                        class: "page_header"
                    }, {
                        default: S(( () => [Q(m, {
                            class: "page_title"
                        }, {
                            default: S(( () => [R(W(a.value.name), 1)])),
                            _: 1
                        }), Q(f, {
                            class: "page_imgs",
                            src: wt,
                            mode: ""
                        })])),
                        _: 1
                    }), Q(m, {
                        class: "page_content"
                    }, {
                        default: S(( () => [l.value ? (r(),
                        d(m, {
                            key: 0,
                            class: ""
                        }, {
                            default: S(( () => [Q(xt)])),
                            _: 1
                        })) : T("", !0), n.value ? (r(),
                        d(m, {
                            key: 1
                        }, {
                            default: S(( () => [Q(yt)])),
                            _: 1
                        })) : T("", !0), s.value ? (r(),
                        d(m, {
                            key: 2
                        }, {
                            default: S(( () => [Q(vt)])),
                            _: 1
                        })) : T("", !0), i.value ? (r(),
                        d(m, {
                            key: 3
                        }, {
                            default: S(( () => [Q(At)])),
                            _: 1
                        })) : T("", !0), o.value ? (r(),
                        d(m, {
                            key: 4
                        }, {
                            default: S(( () => [Q(kt)])),
                            _: 1
                        })) : T("", !0), Q(m, {
                            style: {
                                "margin-top": "30upx"
                            }
                        }, {
                            default: S(( () => [Q(Ct)])),
                            _: 1
                        }), Q(m, {
                            class: "content-card-gd"
                        }, {
                            default: S(( () => [Q(m, {
                                class: "flex"
                            }, {
                                default: S(( () => [Q(f, {
                                    class: "gd-img",
                                    src: null != a.value.custom_icon ? a.value.custom_icon : "/static/Three/gdimg.png"
                                }, null, 8, ["src"]), Q(m, {
                                    class: "",
                                    style: {
                                        "margin-left": "10upx",
                                        display: "flex",
                                        "flex-direction": "column",
                                        "justify-content": "center"
                                    }
                                }, {
                                    default: S(( () => [Q(m, {
                                        style: {
                                            "margin-bottom": "15upx",
                                            "font-weight": "600"
                                        }
                                    }, {
                                        default: S(( () => [R(W(null != a.value.custom_title ? a.value.custom_title : "更多"), 1)])),
                                        _: 1
                                    }), Q(m, {
                                        style: {
                                            color: "gray",
                                            "font-size": "12px"
                                        }
                                    }, {
                                        default: S(( () => [R(W(null != a.value.custom_describe ? a.value.custom_describe : ""), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            }), $(Q(m, {
                                class: ""
                            }, {
                                default: S(( () => [$(Q(g, {
                                    text: null != a.value.custom_text ? a.value.custom_text : "点击跳转",
                                    shape: "circle",
                                    color: "#439c5b",
                                    style: {
                                        height: "50upx"
                                    },
                                    onClick: t[0] || (t[0] = e => V(Ve).shareGD(a.value.appid, a.value.skip_path))
                                }, null, 8, ["text"]), [[ee, 0 == a.value.more_set]]), $(Q(g, {
                                    text: null != a.value.custom_text ? a.value.custom_text : "更多",
                                    shape: "circle",
                                    color: "#439c5b",
                                    style: {
                                        height: "50upx"
                                    },
                                    onClick: c
                                }, null, 8, ["text"]), [[ee, 1 == a.value.more_set]]), $(Q(g, {
                                    text: null != a.value.custom_text ? a.value.custom_text : "跳转网页",
                                    shape: "circle",
                                    color: "#439c5b",
                                    style: {
                                        height: "50upx"
                                    },
                                    onClick: p
                                }, null, 8, ["text"]), [[ee, 2 == a.value.more_set]])])),
                                _: 1
                            }, 512), [[ee, null != a.value.more_set]])])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-802dbe3e"]])
  , It = "" + new URL("img_logo-CVp-o-jG.png",import.meta.url).href
  , bt = "" + new URL("icon_dy-BGpVtVLm.png",import.meta.url).href
  , Ut = "data:image/png;base64,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"
  , Bt = "" + new URL("icon_ks-CRAXM0kX.png",import.meta.url).href
  , Et = e({
    __name: "fsp",
    setup(e) {
        const l = x()
          , s = m(!1)
          , i = m("")
          , c = () => {
            const e = window.localStorage.getItem("share_id");
            null != e && (a({
                mask: !0
            }),
            h.get(`/store/couponShow/${e}`).then((e => {
                200 === e.data.code ? i.value = e.data.data.qrcode : n({
                    title: e.data.msg,
                    icon: "none"
                })
            }
            )).catch((e => {
                console.log(e)
            }
            )).finally(( () => {
                o(),
                s.value = !0
            }
            )))
        }
          , p = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , f = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , g = () => {
            "visible" === document.visibilityState ? console.log("用户进入浏览器") : console.log("用户退出浏览器")
        }
        ;
        y(( () => {
            c(),
            document.addEventListener("visibilitychange", g)
        }
        )),
        v(( () => {
            document.removeEventListener("visibilitychange", g)
        }
        ));
        const O = () => {
            Ve.shareDY()
        }
          , M = () => {
            Ve.shareXHS()
        }
          , J = () => {
            Ve.shareKS()
        }
          , j = m({});
        A(( () => {
            c(),
            setTimeout(( () => {
                j.value = l.storeInfo;
                const e = new URLSearchParams(window.location.search);
                "kuaishou" == e.get("type") && w({
                    title: "提示",
                    content: "点击确定发布视频",
                    showCancel: !1,
                    success: () => {
                        window.location.href = `${window.location.origin}/store/kuaishouOauth?plat_id=${j.value.plat_id}&url=${encodeURIComponent(window.location.href)}`
                    }
                }),
                "publish" == e.get("action") && (a({
                    mask: !0,
                    title: "发布视频中"
                }),
                h.get(`${window.location.origin}/store/kuaishouh5?suid=${j.value.sid}&shop_id=${j.value.shop_id}&plat_id=${j.value.plat_id}`).then((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    }),
                    o()
                }
                )).catch((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    })
                }
                )))
            }
            ), 500)
        }
        ));
        const F = m(!1)
          , Y = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => [F.value, s.value]), (e => {
            e[0] || e[1] ? Y(!0) : Y(!1)
        }
        ));
        const N = () => {
            F.value = !1,
            q.value = "",
            X.value = ""
        }
          , Z = async () => {
            a({
                mask: !0
            });
            try {
                const e = await h.get("/store/douyinVideo", {
                    params: {
                        suid: j.value.sid,
                        plat_id: j.value.plat_id,
                        shop_id: j.value.shop_id
                    }
                });
                200 === e.data.code && (q.value = e.data.data,
                $.value = e.data.data.desc)
            } catch (e) {
                console.log(e)
            } finally {
                o()
            }
            F.value = !0
        }
          , H = () => {
            window.location.href = "weixin://"
        }
          , q = m("")
          , X = m("")
          , $ = m("");
        return (e, m) => {
            const g = K
              , h = u
              , w = C(I("up-icon"), _)
              , x = P
              , y = C(I("up-text"), b)
              , v = G
              , A = C(I("up-button"), U)
              , k = C(I("up-popup"), B)
              , j = C(I("ss-download"), se)
              , Y = C(I("up-image"), E)
              , ee = C(I("up-modal"), D);
            return r(),
            d(h, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(h, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(h, {
                        class: "card-title"
                    }, {
                        default: S(( () => [L("img", {
                            class: "title-img",
                            src: st,
                            alt: ""
                        }), Q(g, {
                            class: "title-text"
                        }, {
                            default: S(( () => [R("发视频")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(h, {
                        class: "flex flex-sb flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(l).dyswich ? (r(),
                        d(h, {
                            key: 0,
                            class: "cards-min",
                            onClick: O,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(h, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: bt,
                                    alt: ""
                                }), Q(h, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("发抖音")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(l).xhsswich ? (r(),
                        d(h, {
                            key: 1,
                            class: "cards-min",
                            onClick: M,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(h, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: Ut,
                                    alt: ""
                                }), Q(h, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("小红书")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(l).sphswich ? (r(),
                        d(h, {
                            key: 2,
                            class: "cards-min flex",
                            onClick: Z,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(h, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: "data:image/png;base64,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",
                                    alt: ""
                                }), Q(h, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("发视频号")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(l).ksswich ? (r(),
                        d(h, {
                            key: 3,
                            class: "cards-min flex",
                            onClick: J,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(h, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: Bt,
                                    alt: ""
                                }), Q(h, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("发快手")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }), Q(k, {
                    show: F.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: N,
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(h, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(h, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(w, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(h, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(h, {
                                class: "name"
                            }, {
                                default: S(( () => [R("视频号文案")])),
                                _: 1
                            }), Q(h, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(x, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "150rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(h, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W($.value), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(h, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(h, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(y, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: m[0] || (m[0] = e => {
                                            return t = $.value,
                                            void z({
                                                data: t,
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(h, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(h, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(v, {
                                    style: {
                                        width: "100%",
                                        height: "200rpx",
                                        "border-radius": "15rpx",
                                        "margin-bottom": "20rpx"
                                    },
                                    src: q.value.videoUrl,
                                    poster: `${q.value.videoUrl}?x-oss-process=video/snapshot,t_14321,f_jpg,w_0,h_0,ar_h`
                                }, null, 8, ["src", "poster"]), Q(A, {
                                    text: "保存视频",
                                    shape: "circle",
                                    color: "#439c5b",
                                    onClick: m[1] || (m[1] = e => {
                                        return l = q.value,
                                        a({
                                            mask: !0
                                        }),
                                        void t({
                                            url: l.videoUrl,
                                            success: e => {
                                                if (200 === e.statusCode) {
                                                    o();
                                                    const t = e.tempFilePath
                                                      , a = document.createElement("a");
                                                    a.download = l.title,
                                                    a.href = t,
                                                    document.body.appendChild(a),
                                                    a.click(),
                                                    a.remove()
                                                }
                                            }
                                            ,
                                            fail: e => {}
                                        });
                                        var l
                                    }
                                    )
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(A, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: H
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(j, {
                    ref: "ssdownload",
                    fileUrl: q.value,
                    fileType: X.value
                }, null, 8, ["fileUrl", "fileType"]), Q(ee, {
                    show: s.value,
                    title: "提示",
                    "show-cancel-button": "",
                    onCancel: p,
                    onConfirm: f
                }, {
                    default: S(( () => [Q(h, {
                        style: {
                            display: "flex",
                            "flex-direction": "column",
                            "align-items": "center"
                        }
                    }, {
                        default: S(( () => [Q(h, {
                            style: {
                                color: "gray",
                                "margin-bottom": "20upx",
                                "text-align": "center"
                            }
                        }, {
                            default: S(( () => [R(W("" != i.value ? "视频发布成功，建议截图保存二维码" : "获取失败，可手动获取尝试") + " ", 1), L("br"), R(" (长按也可保存) ")])),
                            _: 1
                        }), Q(Y, {
                            "show-loading": !0,
                            src: i.value,
                            width: "200px",
                            height: "200px"
                        }, null, 8, ["src"]), "" == i.value ? (r(),
                        d(h, {
                            key: 0,
                            style: {
                                "margin-top": "30upx",
                                width: "100%"
                            }
                        }, {
                            default: S(( () => [Q(A, {
                                text: "手动获取",
                                color: "#439c5b",
                                onClick: c
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-2fe6fc43"]])
  , Dt = "" + new URL("icon_dzdp-B4m879v6.png",import.meta.url).href
  , St = "" + new URL("icon_gd-D6lty68k.png",import.meta.url).href
  , Qt = "" + new URL("icon_mt-B09U0ZU6.png",import.meta.url).href
  , Lt = e({
    __name: "dpdk",
    setup(e) {
        const t = x();
        g("storeInfo");
        const l = async e => {
            a({
                title: "",
                mask: !0
            });
            try {
                const a = await h.get("/store/copywriting", {
                    params: {
                        plat_id: t.storeInfo.plat_id,
                        shop_id: t.storeInfo.shop_id,
                        sid: t.storeInfo.sid,
                        copywriter_type: e
                    }
                });
                if (200 === a.data.code)
                    return a.data.data;
                n({
                    icon: "none",
                    title: a.data.msg
                })
            } catch (l) {
                console.log(l)
            } finally {
                o()
            }
        }
          , s = m(!1)
          , i = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => s.value), (e => {
            i(!!e)
        }
        ));
        const c = async e => {
            if ("大众点评" == e) {
                const e = await l("dzdp");
                null != e && f(e, "dzdp", "大众点评文案")
            }
            if ("抖音点评" == e) {
                const e = await l("dydp");
                null != e && f(e, "dydp", "抖音点评文案")
            }
            if ("高德点评" == e) {
                const e = await l("mtdp");
                null != e && f(e, "gddp", "高德点评文案")
            }
            if ("美团点评" == e) {
                const e = await l("mtdp");
                null != e && f(e, "mtdp", "美团点评文案")
            }
            "小红书" == e && Ve.shareXHSBJ()
        }
          , p = m({
            type: "",
            title: "",
            content: "",
            srcList: ""
        })
          , f = (e, t, a) => {
            if (null != e && ("" == e.path || e.path),
            null == e)
                return "dydp" == t && Ve.shareDYDP(),
                "dzdp" == t && Ve.shareDZDP(),
                "gddp" == t && Ve.shareGDDP(),
                void ("mtdp" == t && Ve.shareMTDP());
            setTimeout(( () => {
                p.value = {
                    type: t,
                    title: a,
                    content: e.title,
                    srcList: e.path
                }
            }
            ), 500),
            s.value = !0
        }
        ;
        return (e, a) => {
            const l = K
              , o = u
              , i = C(I("up-icon"), _)
              , f = P
              , m = C(I("up-text"), b)
              , g = C(I("up-grid-item"), O)
              , h = C(I("up-grid"), M)
              , w = C(I("up-button"), U)
              , x = C(I("up-popup"), B);
            return r(),
            d(o, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(o, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(o, {
                        class: "card-title"
                    }, {
                        default: S(( () => [L("img", {
                            class: "title-img",
                            src: ct,
                            alt: ""
                        }), Q(l, {
                            class: "title-text"
                        }, {
                            default: S(( () => [R("点评打卡")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(o, {
                        class: "flex flex-sb flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(t).dzdpswich ? (r(),
                        d(o, {
                            key: 0,
                            class: "cards-min",
                            onClick: a[0] || (a[0] = e => c("大众点评")),
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Dt),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("大众点评")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).dydpswich ? (r(),
                        d(o, {
                            key: 1,
                            class: "cards-min",
                            onClick: a[1] || (a[1] = e => c("抖音点评")),
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(bt),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("抖音点评")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).gddpswich ? (r(),
                        d(o, {
                            key: 2,
                            class: "cards-min",
                            onClick: a[2] || (a[2] = e => c("高德点评")),
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(St),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("高德点评")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).mtdpswich ? (r(),
                        d(o, {
                            key: 3,
                            class: "cards-min",
                            onClick: a[3] || (a[3] = e => c("美团点评")),
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Qt),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("美团点评")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).xhsbjswich ? (r(),
                        d(o, {
                            key: 4,
                            class: "cards-min",
                            onClick: a[4] || (a[4] = e => c("小红书")),
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: Ut,
                                    alt: ""
                                }), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("小红书笔记")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }), Q(x, {
                    show: s.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: a[7] || (a[7] = e => s.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(o, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(o, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(i, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(o, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(p.value.title), 1)])),
                                _: 1
                            }), Q(o, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(f, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "250rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(o, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(p.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(o, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(o, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(m, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: a[5] || (a[5] = e => {
                                            return t = p.value.content,
                                            void z({
                                                data: t,
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(o, {
                            style: {
                                "margin-bottom": "60rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "name"
                            }, {
                                default: S(( () => [R(" 评论图片 "), Q(l, {
                                    class: "baocun"
                                }, {
                                    default: S(( () => [R("长按图片可保存")])),
                                    _: 1
                                })])),
                                _: 1
                            }), Q(o, {
                                class: "card"
                            }, {
                                default: S(( () => [0 != p.value.srcList.length ? (r(),
                                d(f, {
                                    key: 0,
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "500rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(h, {
                                        border: !1,
                                        onClick: e.click
                                    }, {
                                        default: S(( () => [(r(!0),
                                        J(j, null, F(p.value.srcList, ( (e, t) => (r(),
                                        d(g, {
                                            key: t
                                        }, {
                                            default: S(( () => [L("img", {
                                                class: "card-img",
                                                src: e,
                                                onClick: e => ( (e, t) => {
                                                    Y({
                                                        current: t,
                                                        urls: e,
                                                        indicator: "default"
                                                    })
                                                }
                                                )(p.value.srcList, t),
                                                mode: "aspectFill"
                                            }, null, 8, ["src", "onClick"])])),
                                            _: 2
                                        }, 1024)))), 128))])),
                                        _: 1
                                    }, 8, ["onClick"])])),
                                    _: 1
                                })) : (r(),
                                d(o, {
                                    key: 1,
                                    style: {
                                        display: "flex",
                                        "justify-content": "center"
                                    }
                                }, {
                                    default: S(( () => [L("img", {
                                        src: Te,
                                        style: {
                                            height: "130rpx"
                                        },
                                        mode: "heightFix"
                                    })])),
                                    _: 1
                                }))])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(w, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: a[6] || (a[6] = e => {
                                return "dydp" == (t = p.value.type) && Ve.shareDYDP(),
                                "dzdp" == t && Ve.shareDZDP(),
                                "gddp" == t && Ve.shareGDDP(),
                                void ("mtdp" == t && Ve.shareMTDP());
                                var t
                            }
                            )
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-e0c0badb"]])
  , Vt = "" + new URL("icon_pyq-BfwAsmsw.png",import.meta.url).href
  , Rt = e({
    __name: "qt",
    setup(e) {
        const t = x();
        m([{
            title: "发朋友圈",
            img: Vt
        }]);
        const l = g("storeInfo")
          , s = m(!1)
          , i = m(!1)
          , c = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => i.value), (e => {
            c(!!e)
        }
        ));
        const p = m({
            type: "",
            title: "",
            content: "",
            srcList: ""
        })
          , f = async e => {
            if ("发朋友圈" == e) {
                const e = await (async () => {
                    a({
                        title: "",
                        mask: !0
                    });
                    try {
                        const e = await h.get("/store/copywriting", {
                            params: {
                                plat_id: l.plat_id,
                                shop_id: l.shop_id,
                                sid: l.sid,
                                copywriter_type: "pyq"
                            }
                        });
                        if (console.log(e),
                        200 === e.data.code)
                            return e.data.data;
                        n({
                            icon: "none",
                            title: e.data.msg
                        })
                    } catch (e) {
                        console.log(e)
                    } finally {
                        o()
                    }
                }
                )();
                null != e && ( (e, t, a) => {
                    p.value = {
                        type: t,
                        title: a,
                        content: e.title,
                        srcList: e.path
                    },
                    i.value = !0
                }
                )(e, "pyqdp", "朋友圈点评文案")
            }
            if ("连WIFI" == e) {
                if (0 == t.wxChannel)
                    return void Ve.shareWIFI();
                s.value = !0
            }
        }
          , w = e => {
            z({
                data: e,
                success: function() {
                    n({
                        title: "复制成功",
                        icon: "none",
                        duration: 2e3
                    })
                },
                fail: function() {
                    n({
                        title: "复制失败,请检查权限",
                        icon: "none",
                        duration: 2e3
                    }),
                    console.log("复制失败")
                }
            })
        }
        ;
        return (e, a) => {
            const o = K
              , n = u
              , c = C(I("up-icon"), _)
              , m = P
              , g = C(I("up-text"), b)
              , h = C(I("up-button"), U)
              , x = C(I("up-popup"), B)
              , y = C(I("up-modal"), D);
            return r(),
            d(n, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(n, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(n, {
                        class: "card-title"
                    }, {
                        default: S(( () => [L("img", {
                            class: "title-img",
                            src: dt,
                            alt: ""
                        }), Q(o, {
                            class: "title-text"
                        }, {
                            default: S(( () => [R("其他")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(n, {
                        class: "flex flex-sb flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(t).dytgswich ? (r(),
                        d(n, {
                            key: 0,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: a[0] || (a[0] = e => V(Ve).shareDYDP())
                        }, {
                            default: S(( () => [Q(n, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(bt),
                                    alt: ""
                                }, null, 8, ["src"]), Q(n, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("抖音团购")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).mttgswich ? (r(),
                        d(n, {
                            key: 1,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: a[1] || (a[1] = e => V(Ve).shareMTDP())
                        }, {
                            default: S(( () => [Q(n, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Qt),
                                    alt: ""
                                }, null, 8, ["src"]), Q(n, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("美团团购")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).pyqswich ? (r(),
                        d(n, {
                            key: 2,
                            class: "cards-min",
                            onClick: a[2] || (a[2] = e => f("发朋友圈"))
                        }, {
                            default: S(( () => [Q(n, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Vt),
                                    alt: ""
                                }, null, 8, ["src"]), Q(n, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("发朋友圈")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).wifiswich ? (r(),
                        d(n, {
                            key: 3,
                            class: "cards-min",
                            onClick: a[3] || (a[3] = e => f("连WIFI"))
                        }, {
                            default: S(( () => [Q(n, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V("data:image/png;base64,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"),
                                    alt: ""
                                }, null, 8, ["src"]), Q(n, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("连WIFI")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }), Q(x, {
                    show: i.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: a[6] || (a[6] = e => i.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(n, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(n, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(c, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(n, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(n, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(p.value.title), 1)])),
                                _: 1
                            }), Q(n, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(m, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "400rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(n, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(p.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(n, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(n, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(g, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: a[4] || (a[4] = e => w(p.value.content)),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(h, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: a[5] || (a[5] = e => (p.value.type,
                            void (0 != t.wxChannel ? Ve.shareFPYQ() : Ve.shareSPH())))
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(y, {
                    show: s.value,
                    title: "连wifi",
                    confirmColor: "#439c5b",
                    onConfirm: a[8] || (a[8] = e => s.value = !1)
                }, {
                    default: S(( () => [Q(n, null, {
                        default: S(( () => [Q(n, {
                            class: ""
                        }, {
                            default: S(( () => [R("wifi名称: " + W(V(l).wifi_name), 1)])),
                            _: 1
                        }), Q(n, {
                            style: {
                                "margin-top": "20rpx",
                                display: "flex"
                            }
                        }, {
                            default: S(( () => [R(" wifi密码: " + W(V(l).wifi_pwd) + " ", 1), Q(n, {
                                style: {
                                    "margin-left": "30rpx"
                                }
                            }, {
                                default: S(( () => [Q(g, {
                                    text: "复制密码",
                                    color: "#439c5b",
                                    onClick: a[7] || (a[7] = e => w(V(l).wifi_pwd))
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-835dc5c1"]])
  , Tt = e({
    __name: "gzzh",
    setup(e) {
        const t = x()
          , a = m(!1)
          , l = N()
          , s = () => {
            "ios" == l.osName ? window.location.href = "weixin://scanqrcode" : window.location.href = "weixin://",
            a.value = !1
        }
        ;
        return (e, l) => {
            const o = K
              , i = u
              , n = C(I("up-modal"), D);
            return r(),
            d(i, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(i, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(i, {
                        class: "card-title"
                    }, {
                        default: S(( () => [L("img", {
                            class: "title-img",
                            src: it,
                            alt: ""
                        }), Q(o, {
                            class: "title-text"
                        }, {
                            default: S(( () => [R("关注账号")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(i, {
                        class: "flex flex-sb flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(t).jwxswich ? (r(),
                        d(i, {
                            key: 0,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: l[0] || (l[0] = e => (e => {
                                if (console.log(t.wxChannel),
                                "+ 加微信" == e) {
                                    if (0 == t.wxChannel)
                                        return void Ve.shareJWX();
                                    a.value = !0
                                }
                            }
                            )("+ 加微信"))
                        }, {
                            default: S(( () => [Q(i, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V("data:image/png;base64,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"),
                                    alt: ""
                                }, null, 8, ["src"]), Q(i, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("加微信")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).gzdyswich ? (r(),
                        d(i, {
                            key: 1,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: l[1] || (l[1] = e => V(Ve).shareGZDY())
                        }, {
                            default: S(( () => [Q(i, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(bt),
                                    alt: ""
                                }, null, 8, ["src"]), Q(i, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("关注抖音")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).gzksswich ? (r(),
                        d(i, {
                            key: 2,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: l[2] || (l[2] = e => V(Ve).shareGZKS())
                        }, {
                            default: S(( () => [Q(i, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Bt),
                                    alt: ""
                                }, null, 8, ["src"]), Q(i, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("关注快手")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).gzxhsswich ? (r(),
                        d(i, {
                            key: 3,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: l[3] || (l[3] = e => V(Ve).shareGZXHS())
                        }, {
                            default: S(( () => [Q(i, {
                                class: "cards-min-it"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Ut),
                                    alt: ""
                                }, null, 8, ["src"]), Q(i, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("关注小红书")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }), Q(n, {
                    show: a.value,
                    title: "加微信",
                    confirmColor: "#439c5b",
                    onConfirm: s
                }, {
                    default: S(( () => [Q(i, {
                        class: ""
                    }, {
                        default: S(( () => [Q(i, {
                            style: {
                                "margin-bottom": "20upx"
                            }
                        }, {
                            default: S(( () => [L("img", {
                                class: "img",
                                src: e.info.qun_img,
                                mode: "aspectFit",
                                onLongtap: l[4] || (l[4] = (...t) => e.upImg && e.upImg(...t))
                            }, null, 40, ["src"])])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-95474a5c"]])
  , Wt = e({
    __name: "yhtg",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m([]);
        A(( () => {
            setTimeout(( () => {
                a.value = t.storeInfo,
                (async () => {
                    try {
                        const e = await h.get("/store/GrouPurchase", {
                            params: {
                                suid: a.value.sid
                            }
                        });
                        200 === e.data.code && (l.value = e.data.data)
                    } catch (e) {
                        console.log(e)
                    }
                }
                )()
            }
            ), 500)
        }
        ));
        return (e, t) => {
            const a = u
              , s = K
              , o = C(I("up-scroll-list"), Z);
            return r(),
            d(a, {
                class: "page"
            }, {
                default: S(( () => [0 != l.value.length ? (r(),
                d(o, {
                    key: 0,
                    indicator: !1,
                    indicatorBarWidth: 10
                }, {
                    default: S(( () => [(r(!0),
                    J(j, null, F(l.value, ( (e, t) => (r(),
                    d(a, {
                        key: t
                    }, {
                        default: S(( () => [Q(a, {
                            class: "flex yhtg-card"
                        }, {
                            default: S(( () => [L("img", {
                                class: "yhtg-img",
                                src: e.goods_img
                            }, null, 8, ["src"]), Q(a, {
                                class: "flex flex-col flex-sb",
                                style: {
                                    "margin-left": "20rpx",
                                    flex: "1"
                                }
                            }, {
                                default: S(( () => [Q(a, null, {
                                    default: S(( () => [Q(a, {
                                        class: "yhtg-title f-700"
                                    }, {
                                        default: S(( () => [R(W(e.goods_name), 1)])),
                                        _: 2
                                    }, 1024), Q(a, {
                                        class: "flex flex-sb"
                                    }, {
                                        default: S(( () => [Q(s, {
                                            class: "yhtg-sub-title"
                                        }, {
                                            default: S(( () => [R(W(e.goods_label), 1)])),
                                            _: 2
                                        }, 1024), Q(s, {
                                            class: "yhtg-sub-title",
                                            style: {
                                                color: "#ccc"
                                            }
                                        }, {
                                            default: S(( () => [R(W("已售" + e.sell_num), 1)])),
                                            _: 2
                                        }, 1024)])),
                                        _: 2
                                    }, 1024)])),
                                    _: 2
                                }, 1024), Q(a, {
                                    class: "price-box",
                                    onClick: t => (e => {
                                        const t = new URL(`snssdk1128://poi/goodsdetail/?activity_id=${e.goods_link}`);
                                        window.location.href = t
                                    }
                                    )(e)
                                }, {
                                    default: S(( () => [Q(s, {
                                        class: "price",
                                        style: {
                                            "margin-right": "10rpx"
                                        }
                                    }, {
                                        default: S(( () => [R(W("￥" + e.market_price), 1)])),
                                        _: 2
                                    }, 1024), Q(s, {
                                        class: "no-price"
                                    }, {
                                        default: S(( () => [R(W("￥" + e.original_price), 1)])),
                                        _: 2
                                    }, 1024)])),
                                    _: 2
                                }, 1032, ["onClick"])])),
                                _: 2
                            }, 1024)])),
                            _: 2
                        }, 1024)])),
                        _: 2
                    }, 1024)))), 128))])),
                    _: 1
                })) : T("", !0), Q(a, {
                    style: {
                        height: "104rpx"
                    }
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-5658f158"]])
  , zt = e({
    __name: "index",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m(!0)
          , s = m(!0)
          , o = m(!0)
          , i = m(!0)
          , n = m(!0);
        return H(( () => {
            t.dyswich || t.ksswich || t.sphswich || t.xhsswich ? l.value = !0 : l.value = !1,
            t.dzdpswich || t.dydpswich || t.gddpswich || t.mtdpswich ? s.value = !0 : s.value = !1,
            t.jwxswich || t.pyqswich ? o.value = !0 : o.value = !1,
            t.mttgswich || t.dztgswich || t.dytgswich ? i.value = !0 : i.value = !1,
            t.gzdyswich || t.gzksswich || t.gzxhsswich ? n.value = !0 : n.value = !1,
            a.value = t.storeInfo
        }
        )),
        (e, t) => {
            const o = K
              , c = u;
            return r(),
            d(c, {
                class: "page-appTwo"
            }, {
                default: S(( () => [Q(c, null, {
                    default: S(( () => [Q(c, {
                        class: "kh"
                    }, {
                        default: S(( () => [L("img", {
                            style: {
                                height: "30rpx"
                            },
                            src: It,
                            alt: ""
                        }), Q(o, {
                            class: "kh-top"
                        }, {
                            default: S(( () => [R(W(a.value.name), 1)])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(c, {
                        class: "content"
                    }, {
                        default: S(( () => [l.value ? (r(),
                        d(c, {
                            key: 0,
                            class: ""
                        }, {
                            default: S(( () => [Q(Et)])),
                            _: 1
                        })) : T("", !0), n.value ? (r(),
                        d(c, {
                            key: 1,
                            style: {
                                "margin-top": "10upx"
                            }
                        }, {
                            default: S(( () => [Q(Tt)])),
                            _: 1
                        })) : T("", !0), s.value ? (r(),
                        d(c, {
                            key: 2,
                            style: {
                                "margin-top": "10upx"
                            }
                        }, {
                            default: S(( () => [Q(Lt)])),
                            _: 1
                        })) : T("", !0), i.value ? (r(),
                        d(c, {
                            key: 3,
                            style: {
                                "margin-top": "10upx"
                            }
                        }, {
                            default: S(( () => [Q(Rt)])),
                            _: 1
                        })) : T("", !0), Q(c, {
                            style: {
                                "margin-top": "10upx"
                            }
                        }, {
                            default: S(( () => [Q(Wt)])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-1a38191e"]])
  , Pt = e({
    __name: "fsp",
    setup(e) {
        const l = x()
          , s = m(!1)
          , i = m("")
          , c = () => {
            const e = window.localStorage.getItem("share_id");
            null != e && (a({
                mask: !0
            }),
            h.get(`/store/couponShow/${e}`).then((e => {
                200 === e.data.code ? i.value = e.data.data.qrcode : n({
                    title: e.data.msg,
                    icon: "none"
                })
            }
            )).catch((e => {
                console.log(e)
            }
            )).finally(( () => {
                o(),
                s.value = !0
            }
            )))
        }
          , p = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , f = () => {
            s.value = !1,
            window.localStorage.removeItem("share_id")
        }
          , O = () => {
            "visible" === document.visibilityState ? console.log("用户进入浏览器") : console.log("用户退出浏览器")
        }
        ;
        y(( () => {
            c(),
            document.addEventListener("visibilitychange", O)
        }
        )),
        v(( () => {
            document.removeEventListener("visibilitychange", O)
        }
        ));
        const M = () => {
            Ve.shareDY()
        }
          , J = () => {
            Ve.shareXHS()
        }
          , j = () => {
            Ve.shareKS()
        }
          , F = m({});
        A(( () => {
            c(),
            setTimeout(( () => {
                F.value = l.storeInfo;
                const e = new URLSearchParams(window.location.search);
                "kuaishou" == e.get("type") && w({
                    title: "提示",
                    content: "点击确定发布视频",
                    showCancel: !1,
                    success: () => {
                        window.location.href = `${window.location.origin}/store/kuaishouOauth?plat_id=${F.value.plat_id}&url=${encodeURIComponent(window.location.href)}`
                    }
                }),
                "publish" == e.get("action") && (a({
                    mask: !0,
                    title: "发布视频中"
                }),
                h.get(`${window.location.origin}/store/kuaishouh5?suid=${F.value.sid}&shop_id=${F.value.shop_id}&plat_id=${F.value.plat_id}&fans=${g("fans")}`).then((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    }),
                    o()
                }
                )).catch((e => {
                    n({
                        icon: "none",
                        title: e.data.msg
                    })
                }
                )))
            }
            ), 500)
        }
        ));
        const Y = m(!1)
          , N = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => [Y.value, s.value]), (e => {
            e[0] || e[1] ? N(!0) : N(!1)
        }
        ));
        const Z = () => {
            Y.value = !1,
            X.value = "",
            $.value = ""
        }
          , H = async () => {
            if (!he()) {
                a({
                    mask: !0
                });
                try {
                    const e = await h.get("/store/douyinVideo", {
                        params: {
                            suid: F.value.sid,
                            plat_id: F.value.plat_id,
                            shop_id: F.value.shop_id
                        }
                    });
                    200 === e.data.code ? (o(),
                    X.value = e.data.data,
                    ee.value = e.data.data.desc,
                    Y.value = !0) : n({
                        icon: "none",
                        title: e.data.msg
                    })
                } catch (e) {
                    console.log(e)
                }
            }
        }
          , q = () => {
            window.location.href = "weixin://"
        }
          , X = m("")
          , $ = m("")
          , ee = m("")
          , te = (e, l) => {
            a({
                mask: !0
            }),
            t({
                url: e.videoUrl,
                success: t => {
                    if (200 === t.statusCode) {
                        o();
                        const a = t.tempFilePath
                          , l = document.createElement("a");
                        l.download = e.title,
                        l.href = a,
                        document.body.appendChild(l),
                        l.click(),
                        l.remove()
                    }
                }
                ,
                fail: e => {
                    n({
                        title: e,
                        icon: "none"
                    })
                }
            })
        }
        ;
        return (e, t) => {
            const a = K
              , o = u
              , m = C(I("up-icon"), _)
              , g = P
              , h = C(I("up-text"), b)
              , x = G
              , y = C(I("up-button"), U)
              , v = C(I("up-popup"), B)
              , A = C(I("ss-download"), se)
              , k = C(I("up-image"), E)
              , O = C(I("up-modal"), D);
            return r(),
            d(o, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(o, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(a, {
                        class: "card-title"
                    }, {
                        default: S(( () => [R("视频发布")])),
                        _: 1
                    }), Q(o, {
                        class: "flex flex-sb flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(l).dyswich ? (r(),
                        d(o, {
                            key: 0,
                            class: "cards-min",
                            onClick: M,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: ie,
                                    alt: ""
                                }), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("发抖音")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(l).xhsswich ? (r(),
                        d(o, {
                            key: 1,
                            class: "cards-min",
                            onClick: J,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: ce,
                                    alt: ""
                                }), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("小红书")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(l).sphswich ? (r(),
                        d(o, {
                            key: 2,
                            class: "cards-min flex",
                            onClick: H,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: de,
                                    alt: ""
                                }), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("视频号")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(l).ksswich ? (r(),
                        d(o, {
                            key: 3,
                            class: "cards-min flex",
                            onClick: j,
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa",
                                style: {
                                    height: "65rpx"
                                }
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: pe,
                                    alt: ""
                                }), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("发快手")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }), Q(v, {
                    show: Y.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: Z,
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(o, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(o, {
                            class: "icon",
                            onClick: t[0] || (t[0] = e => Y.value = !1)
                        }, {
                            default: S(( () => [Q(m, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(o, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "name"
                            }, {
                                default: S(( () => [R("视频号文案")])),
                                _: 1
                            }), Q(o, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(g, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "200rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(o, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(ee.value), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(o, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(o, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(h, {
                                        text: "复制文案",
                                        align: "right",
                                        color: "#439c5b",
                                        onClick: t[1] || (t[1] = e => {
                                            return t = ee.value,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(o, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(x, {
                                style: {
                                    width: "100%",
                                    height: "400rpx"
                                },
                                src: X.value.videoUrl,
                                "show-center-play-btn": !1,
                                poster: `${X.value.videoUrl}?x-oss-process=video/snapshot,t_14321,f_jpg,w_0,h_0,ar_h`
                            }, null, 8, ["src", "poster"])])),
                            _: 1
                        }), Q(o, {
                            style: {
                                display: "flex"
                            }
                        }, {
                            default: S(( () => [Q(y, {
                                text: "保存视频",
                                shape: "circle",
                                onClick: t[2] || (t[2] = e => {
                                    return t = X.value,
                                    void (we() ? w({
                                        title: "下载提示",
                                        content: "点击确定后视频将下载到浏览器，您可以点击下方地址栏中下载按钮打开视频，点击分享按钮存储视频，即可保存到相册中",
                                        confirmColor: "#439c5b",
                                        success(e) {
                                            e.confirm && te(t)
                                        }
                                    }) : te(t));
                                    var t
                                }
                                ),
                                style: {
                                    "margin-right": "15px"
                                }
                            }), Q(y, {
                                text: "去点评",
                                shape: "circle",
                                color: "#439c5b",
                                onClick: q
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(A, {
                    ref: "ssdownload",
                    fileUrl: X.value,
                    fileType: $.value
                }, null, 8, ["fileUrl", "fileType"]), Q(O, {
                    show: s.value,
                    title: "提示",
                    "show-cancel-button": "",
                    onCancel: p,
                    onConfirm: f
                }, {
                    default: S(( () => [Q(o, {
                        style: {
                            display: "flex",
                            "flex-direction": "column",
                            "align-items": "center"
                        }
                    }, {
                        default: S(( () => [Q(o, {
                            style: {
                                color: "gray",
                                "margin-bottom": "20upx",
                                "text-align": "center"
                            }
                        }, {
                            default: S(( () => [R(W("" != i.value ? "视频发布成功，建议截图保存二维码" : "获取失败，可手动获取尝试") + " ", 1), L("br"), R(" (长按也可保存) ")])),
                            _: 1
                        }), Q(k, {
                            "show-loading": !0,
                            src: i.value,
                            width: "200px",
                            height: "200px"
                        }, null, 8, ["src"]), "" == i.value ? (r(),
                        d(o, {
                            key: 0,
                            style: {
                                "margin-top": "30upx",
                                width: "100%"
                            }
                        }, {
                            default: S(( () => [Q(y, {
                                text: "手动获取",
                                color: "#439c5b",
                                onClick: c
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-d01d0588"]])
  , Gt = e({
    __name: "dpdk",
    setup(e) {
        const t = x();
        g("storeInfo");
        const l = async e => {
            if (!he()) {
                a({
                    title: "",
                    mask: !0
                });
                try {
                    const a = await h.get("/store/copywriting", {
                        params: {
                            plat_id: t.storeInfo.plat_id,
                            shop_id: t.storeInfo.shop_id,
                            sid: t.storeInfo.sid,
                            copywriter_type: e
                        }
                    });
                    if (200 === a.data.code)
                        return a.data.data;
                    n({
                        icon: "none",
                        title: a.data.msg
                    })
                } catch (l) {
                    console.log(l)
                } finally {
                    o()
                }
            }
        }
          , s = m(!1)
          , i = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => s.value), (e => {
            i(!!e)
        }
        ));
        const c = async e => {
            if ("大众点评" == e) {
                const e = await l("dzdp");
                null != e && f(e, "dzdp", "大众点评文案")
            }
            if ("抖音点评" == e) {
                const e = await l("dydp");
                null != e && f(e, "dydp", "抖音点评文案")
            }
            if ("高德点评" == e) {
                const e = await l("mtdp");
                null != e && f(e, "gddp", "高德点评文案")
            }
            if ("美团点评" == e) {
                const e = await l("mtdp");
                null != e && f(e, "mtdp", "美团点评文案")
            }
            if ("携程点评" == e) {
                const e = await l("xcwa");
                null != e && f(e, "xcdp", "携程点评文案")
            }
            if ("携程笔记" == e) {
                const e = await l("xcwa");
                null != e && f(e, "xcbj", "携程笔记文案")
            }
        }
          , p = m({
            type: "",
            title: "",
            content: "",
            srcList: ""
        })
          , f = (e, t, a) => {
            if (null != e && ("" == e.path || e.path),
            null == e)
                return "dydp" == t && Ve.shareDYDP(),
                "dzdp" == t && Ve.shareDZDP(),
                "gddp" == t && Ve.shareGDDP(),
                "mtdp" == t && Ve.shareMTDP(),
                "xcdp" == t && Ve.shareXCDP(),
                void ("xcbj" == t && Ve.shareXCBJ());
            setTimeout(( () => {
                p.value = {
                    type: t,
                    title: a,
                    content: e.title,
                    srcList: e.path
                }
            }
            ), 500),
            s.value = !0
        }
        ;
        return (e, a) => {
            const l = K
              , o = u
              , i = C(I("up-icon"), _)
              , f = P
              , m = C(I("up-text"), b)
              , g = C(I("up-grid-item"), O)
              , h = C(I("up-grid"), M)
              , w = C(I("up-button"), U)
              , x = C(I("up-popup"), B);
            return r(),
            d(o, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(o, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(l, {
                        class: "card-title"
                    }, {
                        default: S(( () => [R("打卡/点评/收藏")])),
                        _: 1
                    }), Q(o, {
                        class: "flex flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(t).dzdpswich ? (r(),
                        d(o, {
                            key: 0,
                            class: "cards-min",
                            onClick: a[0] || (a[0] = e => c("大众点评")),
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(We),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("点评+打卡")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).dydpswich ? (r(),
                        d(o, {
                            key: 1,
                            class: "cards-min",
                            onClick: a[1] || (a[1] = e => c("抖音点评")),
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(ie),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("点评+收藏")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).gddpswich ? (r(),
                        d(o, {
                            key: 2,
                            class: "cards-min",
                            onClick: a[2] || (a[2] = e => c("高德点评")),
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(ze),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("点评+收藏")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).mtdpswich ? (r(),
                        d(o, {
                            key: 3,
                            class: "cards-min",
                            onClick: a[3] || (a[3] = e => c("美团点评")),
                            style: {
                                "margin-bottom": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Pe),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("点评+收藏")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).xcdpswich ? (r(),
                        d(o, {
                            key: 4,
                            class: "cards-min",
                            onClick: a[4] || (a[4] = e => c("携程点评")),
                            style: {
                                "margin-top": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Ge),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("点评+收藏")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).xcdpswich ? (r(),
                        d(o, {
                            key: 5,
                            class: "cards-min",
                            onClick: a[5] || (a[5] = e => c("携程笔记")),
                            style: {
                                "margin-top": "10rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Ge),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("携程笔记")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0)])),
                        _: 1
                    })])),
                    _: 1
                }), Q(x, {
                    show: s.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: a[8] || (a[8] = e => s.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(o, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(o, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(i, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(o, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(p.value.title), 1)])),
                                _: 1
                            }), Q(o, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(f, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "250rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(o, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(p.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(o, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(o, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(m, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: a[6] || (a[6] = e => {
                                            return t = p.value.content,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(o, {
                            style: {
                                "margin-bottom": "60rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "name"
                            }, {
                                default: S(( () => [Q(o, null, {
                                    default: S(( () => [R(" 点评图片 "), Q(l, {
                                        class: "baocun"
                                    }, {
                                        default: S(( () => [R("长按图片可保存")])),
                                        _: 1
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            }), Q(o, {
                                class: "card"
                            }, {
                                default: S(( () => [0 != p.value.srcList.length ? (r(),
                                d(f, {
                                    key: 0,
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "500rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(h, {
                                        border: !1,
                                        onClick: e.click
                                    }, {
                                        default: S(( () => [(r(!0),
                                        J(j, null, F(p.value.srcList, ( (e, t) => (r(),
                                        d(g, {
                                            key: t
                                        }, {
                                            default: S(( () => [L("img", {
                                                class: "card-img",
                                                src: e,
                                                onClick: e => ( (e, t) => {
                                                    Y({
                                                        current: t,
                                                        urls: e,
                                                        indicator: "default"
                                                    })
                                                }
                                                )(p.value.srcList, t),
                                                mode: "aspectFill"
                                            }, null, 8, ["src", "onClick"])])),
                                            _: 2
                                        }, 1024)))), 128))])),
                                        _: 1
                                    }, 8, ["onClick"])])),
                                    _: 1
                                })) : (r(),
                                d(o, {
                                    key: 1,
                                    style: {
                                        display: "flex",
                                        "justify-content": "center"
                                    }
                                }, {
                                    default: S(( () => [L("img", {
                                        src: Te,
                                        style: {
                                            height: "130rpx"
                                        },
                                        mode: "heightFix"
                                    })])),
                                    _: 1
                                }))])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(w, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: a[7] || (a[7] = e => {
                                return "dydp" == (t = p.value.type) && Ve.shareDYDP(),
                                "dzdp" == t && Ve.shareDZDP(),
                                "gddp" == t && Ve.shareGDDP(),
                                "mtdp" == t && Ve.shareMTDP(),
                                "xcdp" == t && Ve.shareXCDP(),
                                void ("xcbj" == t && Ve.shareXCBJ());
                                var t
                            }
                            )
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-a6478f5c"]])
  , Ot = e({
    __name: "twfb",
    setup(e) {
        const t = x();
        m([{
            title: "+ 加微信",
            img: Me
        }, {
            title: "发朋友圈",
            img: Je
        }]);
        const l = g("storeInfo")
          , s = m(!1)
          , i = e => {
            let t = document.body || document.documentElement;
            e ? t.style.overflow = "hidden" : (t.style.overflowX = "hidden",
            t.style.overflowY = "auto")
        }
        ;
        k(( () => s.value), (e => {
            i(!!e)
        }
        ));
        const c = m({
            type: "",
            title: "",
            content: "",
            srcList: ""
        })
          , p = async e => {
            if ("发朋友圈" == e) {
                const e = await (async () => {
                    if (!he()) {
                        a({
                            title: "",
                            mask: !0
                        });
                        try {
                            const e = await h.get("/store/copywriting", {
                                params: {
                                    plat_id: l.plat_id,
                                    shop_id: l.shop_id,
                                    sid: l.sid,
                                    copywriter_type: "pyq"
                                }
                            });
                            if (console.log(e),
                            200 === e.data.code)
                                return e.data.data;
                            n({
                                icon: "none",
                                title: e.data.msg
                            })
                        } catch (e) {
                            console.log(e)
                        } finally {
                            o()
                        }
                    }
                }
                )();
                null != e && ( (e, t, a) => {
                    c.value = {
                        type: t,
                        title: a,
                        content: e.title,
                        srcList: e.path
                    },
                    s.value = !0
                }
                )(e, "pyqdp", "朋友圈点评文案")
            }
            "小红书图文" == e && Ve.shareXHSBJ()
        }
        ;
        return (e, a) => {
            const l = K
              , o = u
              , i = C(I("up-icon"), _)
              , f = P
              , m = C(I("up-text"), b)
              , g = C(I("up-button"), U)
              , h = C(I("up-popup"), B);
            return r(),
            d(o, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(o, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(l, {
                        class: "card-title"
                    }, {
                        default: S(( () => [R("图文发布")])),
                        _: 1
                    }), Q(o, {
                        class: "flex flex-sb flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(t).pyqswich ? (r(),
                        d(o, {
                            key: 0,
                            class: "cards-min",
                            onClick: a[0] || (a[0] = e => p("发朋友圈"))
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Je),
                                    alt: ""
                                }, null, 8, ["src"]), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("发朋友圈")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).xhsbjswich ? (r(),
                        d(o, {
                            key: 1,
                            class: "cards-min",
                            onClick: a[1] || (a[1] = e => p("小红书图文"))
                        }, {
                            default: S(( () => [Q(o, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: ce,
                                    alt: ""
                                }), Q(o, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("小红书笔记")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), Q(o, {
                            class: "cards-min"
                        }), Q(o, {
                            class: "cards-min"
                        })])),
                        _: 1
                    })])),
                    _: 1
                }), Q(h, {
                    show: s.value,
                    round: "15",
                    closeOnClickOverlay: "",
                    onClose: a[4] || (a[4] = e => s.value = !1),
                    zIndex: "20"
                }, {
                    default: S(( () => [Q(o, {
                        class: "pop"
                    }, {
                        default: S(( () => [Q(o, {
                            class: "icon"
                        }, {
                            default: S(( () => [Q(i, {
                                name: "minus",
                                size: "32",
                                color: "#e1e1e1"
                            })])),
                            _: 1
                        }), Q(o, {
                            style: {
                                "margin-bottom": "30rpx"
                            }
                        }, {
                            default: S(( () => [Q(o, {
                                class: "name"
                            }, {
                                default: S(( () => [R(W(c.value.title), 1)])),
                                _: 1
                            }), Q(o, {
                                class: "card"
                            }, {
                                default: S(( () => [Q(f, {
                                    "scroll-y": "true",
                                    style: {
                                        "max-height": "400rpx"
                                    }
                                }, {
                                    default: S(( () => [Q(o, {
                                        class: "card-pl"
                                    }, {
                                        default: S(( () => [R(W(c.value.content), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                }), Q(o, {
                                    style: {
                                        display: "flex",
                                        "justify-content": "space-between"
                                    }
                                }, {
                                    default: S(( () => [Q(o, {
                                        class: "card-text"
                                    }, {
                                        default: S(( () => [R("提示： 评论文案仅供参考，请不要直接复制使用，您的真诚评价是对门店最大的鼓励。")])),
                                        _: 1
                                    }), Q(m, {
                                        text: "复制文案",
                                        color: "#439c5b",
                                        onClick: a[2] || (a[2] = e => {
                                            return t = c.value.content,
                                            void z({
                                                data: String(t),
                                                success: function() {
                                                    n({
                                                        title: "复制成功",
                                                        icon: "none",
                                                        duration: 2e3
                                                    })
                                                },
                                                fail: function() {
                                                    n({
                                                        title: "复制失败,请检查权限",
                                                        icon: "none",
                                                        duration: 2e3
                                                    }),
                                                    console.log("复制失败")
                                                }
                                            });
                                            var t
                                        }
                                        ),
                                        style: {
                                            "margin-left": "20rpx"
                                        }
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        }), Q(g, {
                            text: "去点评",
                            shape: "circle",
                            color: "#439c5b",
                            onClick: a[3] || (a[3] = e => (c.value.type,
                            void (0 != t.wxChannel ? Ve.shareFPYQ() : Ve.shareSPH())))
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-5ecac030"]])
  , Mt = e({
    __name: "sjtg",
    setup(e) {
        const t = x();
        return (e, a) => {
            const l = K
              , s = u;
            return r(),
            d(s, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(s, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(l, {
                        class: "card-title"
                    }, {
                        default: S(( () => [R("商家团购")])),
                        _: 1
                    }), Q(s, {
                        class: "flex flex-sb flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(t).mttgswich ? (r(),
                        d(s, {
                            key: 0,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: a[0] || (a[0] = e => V(Ve).shareMTDP())
                        }, {
                            default: S(( () => [Q(s, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Fe),
                                    alt: ""
                                }, null, 8, ["src"]), Q(s, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("美团团购")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).dztgswich ? (r(),
                        d(s, {
                            key: 1,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: a[1] || (a[1] = e => V(Ve).shareDZDP())
                        }, {
                            default: S(( () => [Q(s, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Ye),
                                    alt: ""
                                }, null, 8, ["src"]), Q(s, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("大众点评")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).dytgswich ? (r(),
                        d(s, {
                            key: 2,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: a[2] || (a[2] = e => V(Ve).shareDYDP())
                        }, {
                            default: S(( () => [Q(s, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Ke),
                                    alt: ""
                                }, null, 8, ["src"]), Q(s, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("抖音团购")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), Q(s, {
                            class: "cards-min"
                        })])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-020067e2"]])
  , Jt = e({
    __name: "gzzh",
    setup(e) {
        const t = x();
        return (e, a) => {
            const l = K
              , s = u;
            return r(),
            d(s, {
                class: "fashiping"
            }, {
                default: S(( () => [Q(s, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(l, {
                        class: "card-title"
                    }, {
                        default: S(( () => [R("关注账号")])),
                        _: 1
                    }), Q(s, {
                        class: "flex flex-sb flex-wrap",
                        style: {
                            width: "100%"
                        }
                    }, {
                        default: S(( () => [V(t).gzdyswich ? (r(),
                        d(s, {
                            key: 0,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: a[0] || (a[0] = e => V(Ve).shareGZDY())
                        }, {
                            default: S(( () => [Q(s, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(Ze),
                                    alt: ""
                                }, null, 8, ["src"]), Q(s, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("关注抖音")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).gzksswich ? (r(),
                        d(s, {
                            key: 1,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: a[1] || (a[1] = e => V(Ve).shareGZKS())
                        }, {
                            default: S(( () => [Q(s, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(He),
                                    alt: ""
                                }, null, 8, ["src"]), Q(s, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("关注快手")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).gzxhsswich ? (r(),
                        d(s, {
                            key: 2,
                            class: "cards-min",
                            style: {
                                "margin-bottom": "10rpx"
                            },
                            onClick: a[2] || (a[2] = e => V(Ve).shareGZXHS())
                        }, {
                            default: S(( () => [Q(s, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    src: V(qe),
                                    alt: ""
                                }, null, 8, ["src"]), Q(s, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("关注小红书")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), Q(s, {
                            class: "cards-min"
                        })])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-e01c3d8c"]])
  , jt = "" + new URL("icon_wifi-DOs1n9qN.png",import.meta.url).href
  , Ft = e({
    __name: "wifi",
    setup(e) {
        const t = x()
          , a = m({});
        A(( () => {
            setTimeout(( () => {
                a.value = t.storeInfo
            }
            ), 500)
        }
        ));
        const l = m(!1)
          , s = m(!1)
          , o = N()
          , i = () => {
            "ios" == o.osName ? window.location.href = "weixin://scanqrcode" : window.location.href = "weixin://",
            s.value = !1
        }
          , c = e => {
            if (!he()) {
                if ("连WIFI" == e) {
                    if (0 == t.wxChannel)
                        return void Ve.shareWIFI();
                    l.value = !0
                }
                if ("+ 加微信" == e) {
                    if (0 == t.wxChannel)
                        return void Ve.shareJWX();
                    s.value = !0
                }
                "视频号点赞" != e || 0 != t.sphswich || Ve.shareSPH()
            }
        }
        ;
        return (e, o) => {
            const p = K
              , f = te
              , m = u
              , g = C(I("up-text"), b)
              , h = C(I("up-modal"), D);
            return r(),
            d(m, {
                class: "page"
            }, {
                default: S(( () => [Q(m, {
                    class: "content-card flex flex-wrap"
                }, {
                    default: S(( () => [Q(p, {
                        class: "card-title"
                    }, {
                        default: S(( () => [R("连WIFI&加微信")])),
                        _: 1
                    }), Q(m, {
                        class: "flex flex-sb flex-wrap"
                    }, {
                        default: S(( () => [V(t).wifiswich ? (r(),
                        d(m, {
                            key: 0,
                            class: "cards-min",
                            onClick: o[0] || (o[0] = e => c("连WIFI"))
                        }, {
                            default: S(( () => [Q(m, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [Q(f, {
                                    class: "icon-min",
                                    src: V(jt),
                                    alt: ""
                                }, null, 8, ["src"]), Q(m, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("连WIFI")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), V(t).jwxswich ? (r(),
                        d(m, {
                            key: 1,
                            class: "cards-min",
                            onClick: o[1] || (o[1] = e => c("+ 加微信"))
                        }, {
                            default: S(( () => [Q(m, {
                                class: "flex flex-wrap flex-sa"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "icon-min",
                                    style: {
                                        width: "78rpx",
                                        height: "78rpx"
                                    },
                                    src: V(Me),
                                    alt: ""
                                }, null, 8, ["src"]), Q(m, {
                                    class: "f-28rpx m-top-16rpx"
                                }, {
                                    default: S(( () => [R("加微信")])),
                                    _: 1
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })) : T("", !0), Q(m, {
                            class: "cards-min"
                        })])),
                        _: 1
                    })])),
                    _: 1
                }), Q(h, {
                    show: l.value,
                    title: "连wifi",
                    confirmColor: "#439c5b",
                    onConfirm: o[3] || (o[3] = e => l.value = !1)
                }, {
                    default: S(( () => [Q(m, null, {
                        default: S(( () => [Q(m, {
                            class: ""
                        }, {
                            default: S(( () => [R("wifi名称: " + W(a.value.wifi_name), 1)])),
                            _: 1
                        }), Q(m, {
                            style: {
                                "margin-top": "20rpx",
                                display: "flex"
                            }
                        }, {
                            default: S(( () => [R(" wifi密码: " + W(a.value.wifi_pwd) + " ", 1), Q(m, {
                                style: {
                                    "margin-left": "30rpx"
                                }
                            }, {
                                default: S(( () => [Q(g, {
                                    text: "复制密码",
                                    color: "#439c5b",
                                    onClick: o[2] || (o[2] = e => {
                                        return t = a.value.wifi_pwd,
                                        void z({
                                            data: String(t),
                                            success: function() {
                                                n({
                                                    title: "复制成功",
                                                    icon: "none",
                                                    duration: 2e3
                                                })
                                            },
                                            fail: function() {
                                                n({
                                                    title: "复制失败,请检查权限",
                                                    icon: "none",
                                                    duration: 2e3
                                                }),
                                                console.log("复制失败")
                                            }
                                        });
                                        var t
                                    }
                                    )
                                })])),
                                _: 1
                            })])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(h, {
                    show: s.value,
                    title: "加微信",
                    confirmColor: "#439c5b",
                    onConfirm: i
                }, {
                    default: S(( () => [Q(m, {
                        class: ""
                    }, {
                        default: S(( () => [Q(m, {
                            style: {
                                "margin-bottom": "20upx"
                            }
                        }, {
                            default: S(( () => [Q(f, {
                                class: "img",
                                src: a.value.qun_img,
                                mode: "aspectFit",
                                onLongtap: e.upImg
                            }, null, 8, ["src", "onLongtap"])])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-ef6bae93"]])
  , Yt = e({
    __name: "yhtg",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m([]);
        A(( () => {
            setTimeout(( () => {
                a.value = t.storeInfo,
                (async () => {
                    try {
                        const e = await h.get("/store/GrouPurchase", {
                            params: {
                                suid: a.value.sid
                            }
                        });
                        200 === e.data.code && (l.value = e.data.data)
                    } catch (e) {
                        console.log(e)
                    }
                }
                )()
            }
            ), 500)
        }
        ));
        return (e, t) => {
            const a = u
              , s = K;
            return r(),
            d(a, {
                class: "page"
            }, {
                default: S(( () => [(r(!0),
                J(j, null, F(l.value, ( (e, t) => (r(),
                d(a, {
                    key: t
                }, {
                    default: S(( () => [Q(a, {
                        class: "flex yhtg-card"
                    }, {
                        default: S(( () => [L("img", {
                            class: "yhtg-img",
                            src: e.goods_img
                        }, null, 8, ["src"]), Q(a, {
                            class: "flex flex-col flex-sb",
                            style: {
                                "margin-left": "20rpx",
                                flex: "1"
                            }
                        }, {
                            default: S(( () => [Q(a, null, {
                                default: S(( () => [Q(a, {
                                    class: "yhtg-name f-700"
                                }, {
                                    default: S(( () => [R(W(e.goods_name), 1)])),
                                    _: 2
                                }, 1024), Q(a, {
                                    class: "flex flex-ac"
                                }, {
                                    default: S(( () => [Q(a, {
                                        class: "zk"
                                    }, {
                                        default: S(( () => [R("餐饮")])),
                                        _: 1
                                    }), Q(a, {
                                        class: "zk"
                                    }, {
                                        default: S(( () => [R("海鲜")])),
                                        _: 1
                                    })])),
                                    _: 1
                                })])),
                                _: 2
                            }, 1024), Q(a, {
                                class: "flex flex-sb"
                            }, {
                                default: S(( () => [Q(a, {
                                    class: "flex price"
                                }, {
                                    default: S(( () => [Q(s, {
                                        style: {
                                            "margin-right": "10rpx"
                                        }
                                    }, {
                                        default: S(( () => [R(W("￥" + e.market_price), 1)])),
                                        _: 2
                                    }, 1024), Q(s, {
                                        class: "no-price"
                                    }, {
                                        default: S(( () => [R(W("￥" + e.original_price), 1)])),
                                        _: 2
                                    }, 1024)])),
                                    _: 2
                                }, 1024), Q(a, {
                                    class: "yhtg-btn",
                                    onClick: t => (e => {
                                        if (he())
                                            return;
                                        const t = new URL(`snssdk1128://poi/goodsdetail/?activity_id=${e.goods_link}`);
                                        window.location.href = t
                                    }
                                    )(e)
                                }, {
                                    default: S(( () => [R("立即购买")])),
                                    _: 2
                                }, 1032, ["onClick"])])),
                                _: 2
                            }, 1024)])),
                            _: 2
                        }, 1024)])),
                        _: 2
                    }, 1024)])),
                    _: 2
                }, 1024)))), 128))])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-d0001e9b"]])
  , Kt = e({
    __name: "index",
    setup(e) {
        const t = x()
          , a = m({})
          , l = m(!0)
          , s = m(!0)
          , o = m(!0)
          , i = m(!0)
          , n = m(!0);
        H(( () => {
            t.dyswich || t.ksswich || t.sphswich || t.xhsswich ? l.value = !0 : l.value = !1,
            t.dzdpswich || t.dydpswich || t.gddpswich || t.mtdpswich ? s.value = !0 : s.value = !1,
            t.jwxswich || t.pyqswich ? o.value = !0 : o.value = !1,
            t.mttgswich || t.dztgswich || t.dytgswich ? i.value = !0 : i.value = !1,
            t.gzdyswich || t.gzksswich || t.gzxhsswich ? n.value = !0 : n.value = !1,
            a.value = t.storeInfo
        }
        ));
        const c = () => {
            Y({
                urls: [a.value.show_img]
            })
        }
          , p = () => {
            he() || (window.location.href = a.value.web_path)
        }
        ;
        return (e, t) => {
            const f = u
              , m = K
              , g = C(I("up-avatar"), q)
              , h = C(I("up-button"), U);
            return r(),
            d(f, {
                class: "page-five",
                style: {
                    "background-color": "rgb(235, 245, 255)"
                }
            }, {
                default: S(( () => [a.value.bgImg ? (r(),
                d(f, {
                    key: 0,
                    class: "back-img",
                    style: X({
                        backgroundImage: `url(${a.value.bgImg})`
                    })
                }, null, 8, ["style"])) : (r(),
                d(f, {
                    key: 1,
                    class: "back-img",
                    style: X({
                        backgroundImage: `url(${V(tt)})`
                    })
                }, null, 8, ["style"])), Q(f, {
                    style: {
                        "margin-top": "-520rpx"
                    }
                }, {
                    default: S(( () => [Q(f, {
                        class: "kh"
                    }, {
                        default: S(( () => [Q(m, {
                            class: "kh-top"
                        }, {
                            default: S(( () => [R("碰一碰 领福利")])),
                            _: 1
                        }), Q(m, {
                            class: "kh-bottom"
                        }, {
                            default: S(( () => [R("让商家营销 更具简单性")])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(f, {
                        class: "avatar"
                    }, {
                        default: S(( () => [Q(m, null, {
                            default: S(( () => [Q(g, {
                                src: a.value.logo,
                                size: "30"
                            }, null, 8, ["src"])])),
                            _: 1
                        }), Q(m, {
                            class: "title"
                        }, {
                            default: S(( () => [R(W(a.value.name), 1)])),
                            _: 1
                        })])),
                        _: 1
                    }), Q(f, {
                        class: "content"
                    }, {
                        default: S(( () => [l.value ? (r(),
                        d(f, {
                            key: 0,
                            class: ""
                        }, {
                            default: S(( () => [Q(Pt)])),
                            _: 1
                        })) : T("", !0), s.value ? (r(),
                        d(f, {
                            key: 1,
                            style: {
                                "margin-top": "30upx"
                            }
                        }, {
                            default: S(( () => [Q(Gt)])),
                            _: 1
                        })) : T("", !0), o.value ? (r(),
                        d(f, {
                            key: 2,
                            style: {
                                "margin-top": "30upx"
                            }
                        }, {
                            default: S(( () => [Q(Ot)])),
                            _: 1
                        })) : T("", !0), i.value ? (r(),
                        d(f, {
                            key: 3,
                            style: {
                                "margin-top": "30upx"
                            }
                        }, {
                            default: S(( () => [Q(Mt)])),
                            _: 1
                        })) : T("", !0), n.value ? (r(),
                        d(f, {
                            key: 4,
                            style: {
                                "margin-top": "30upx"
                            }
                        }, {
                            default: S(( () => [Q(Jt)])),
                            _: 1
                        })) : T("", !0), Q(f, {
                            style: {
                                "margin-top": "30upx"
                            }
                        }, {
                            default: S(( () => [Q(Ft)])),
                            _: 1
                        }), Q(f, {
                            class: "content-card-gd",
                            style: {
                                "margin-top": "30upx"
                            }
                        }, {
                            default: S(( () => [Q(f, {
                                class: "flex"
                            }, {
                                default: S(( () => [L("img", {
                                    class: "gd-img",
                                    src: "" != a.value.custom_icon ? a.value.custom_icon : "/static/Three/gdimg.png"
                                }, null, 8, ["src"]), Q(f, {
                                    class: "",
                                    style: {
                                        "margin-left": "10upx",
                                        display: "flex",
                                        "flex-direction": "column"
                                    }
                                }, {
                                    default: S(( () => [Q(f, {
                                        style: {
                                            "font-size": "24rpx",
                                            color: "#666",
                                            "margin-bottom": "16rpx"
                                        }
                                    }, {
                                        default: S(( () => [R(W("" != a.value.custom_title ? a.value.custom_title : "更多"), 1)])),
                                        _: 1
                                    }), Q(f, {
                                        style: {
                                            "font-size": "28rpx",
                                            color: "#666"
                                        }
                                    }, {
                                        default: S(( () => [R(W("" != a.value.custom_describe ? a.value.custom_describe : ""), 1)])),
                                        _: 1
                                    })])),
                                    _: 1
                                })])),
                                _: 1
                            }), $(Q(f, {
                                class: ""
                            }, {
                                default: S(( () => [$(Q(h, {
                                    text: "" != a.value.custom_text ? a.value.custom_text : "点击跳转",
                                    shape: "circle",
                                    color: "#e1edfc",
                                    style: {
                                        height: "50upx",
                                        color: "#000"
                                    },
                                    onClick: t[0] || (t[0] = e => V(Ve).shareGD(a.value.appid, a.value.skip_path))
                                }, null, 8, ["text"]), [[ee, 0 == a.value.more_set]]), $(Q(h, {
                                    text: "" != a.value.custom_text ? a.value.custom_text : "更多",
                                    shape: "circle",
                                    color: "#e1edfc",
                                    style: {
                                        height: "50upx",
                                        color: "#000"
                                    },
                                    onClick: c
                                }, null, 8, ["text"]), [[ee, 1 == a.value.more_set]]), $(Q(h, {
                                    text: "" != a.value.custom_text ? a.value.custom_text : "跳转网页",
                                    shape: "circle",
                                    color: "#e1edfc",
                                    style: {
                                        height: "50upx",
                                        color: "#000"
                                    },
                                    onClick: p
                                }, null, 8, ["text"]), [[ee, 2 == a.value.more_set]])])),
                                _: 1
                            }, 512), [[ee, null != a.value.more_set]])])),
                            _: 1
                        }), Q(f, {
                            style: {
                                "margin-top": "30upx"
                            }
                        }, {
                            default: S(( () => [Q(Yt)])),
                            _: 1
                        }), Q(f, {
                            class: "footer"
                        }, {
                            default: S(( () => [R(" 本产品使用其他企业、组织的品牌名、商标、LOGO 仅用于客观说明产品的功能及适用场景，旨在帮助用户更清晰地了解产品的适配范围与使用价值，无任何恶意，亦不构成对相关品牌的背书、关联或混淆，相关权利均归原权利人所有。如涉及侵权，请及时联系我们，我们将立即采取措施予以纠正。 ")])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                })])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-d322c4ea"]]);
var Nt, Zt = {
    exports: {}
};
Nt = "object" == typeof window && window,
Zt.exports = function(e, t) {
    var a, l, s, o, i, n, c, r, d, u, p, f, m, g, h, w, x, y, v, A, k, C;
    if (e)
        return e.jWeixin ? e.jWeixin : (a = {
            config: "preVerifyJSAPI",
            onMenuShareTimeline: "menu:share:timeline",
            onMenuShareAppMessage: "menu:share:appmessage",
            onMenuShareQQ: "menu:share:qq",
            onMenuShareWeibo: "menu:share:weiboApp",
            onMenuShareQZone: "menu:share:QZone",
            previewImage: "imagePreview",
            getLocation: "geoLocation",
            openProductSpecificView: "openProductViewWithPid",
            addCard: "batchAddCard",
            openCard: "batchViewCard",
            chooseWXPay: "getBrandWCPayRequest",
            openEnterpriseRedPacket: "getRecevieBizHongBaoRequest",
            startSearchBeacons: "startMonitoringBeacons",
            stopSearchBeacons: "stopMonitoringBeacons",
            onSearchBeacons: "onBeaconsInRange",
            consumeAndShareCard: "consumedShareCard",
            openAddress: "editAddress"
        },
        l = function() {
            var e, t = {};
            for (e in a)
                t[a[e]] = e;
            return t
        }(),
        s = e.document,
        o = s.title,
        i = navigator.userAgent.toLowerCase(),
        f = navigator.platform.toLowerCase(),
        n = !(!f.match("mac") && !f.match("win")),
        c = -1 != i.indexOf("wxdebugger"),
        r = -1 != i.indexOf("micromessenger"),
        d = -1 != i.indexOf("android"),
        u = -1 != i.indexOf("iphone") || -1 != i.indexOf("ipad"),
        p = (f = i.match(/micromessenger\/(\d+\.\d+\.\d+)/) || i.match(/micromessenger\/(\d+\.\d+)/)) ? f[1] : "",
        m = {
            initStartTime: Q(),
            initEndTime: 0,
            preVerifyStartTime: 0,
            preVerifyEndTime: 0
        },
        g = {
            version: 1,
            appId: "",
            initTime: 0,
            preVerifyTime: 0,
            networkType: "",
            isPreVerifyOk: 1,
            systemType: u ? 1 : d ? 2 : -1,
            clientVersion: p,
            url: encodeURIComponent(location.href)
        },
        h = {},
        w = {
            _completes: []
        },
        x = {
            state: 0,
            data: {}
        },
        L((function() {
            m.initEndTime = Q()
        }
        )),
        y = !1,
        v = [],
        A = {
            config: function(t) {
                D("config", h = t);
                var l = !1 !== h.check;
                L((function() {
                    if (l)
                        _(a.config, {
                            verifyJsApiList: E(h.jsApiList),
                            verifyOpenTagList: E(h.openTagList)
                        }, (w._complete = function(e) {
                            m.preVerifyEndTime = Q(),
                            x.state = 1,
                            x.data = e
                        }
                        ,
                        w.success = function(e) {
                            g.isPreVerifyOk = 0
                        }
                        ,
                        w.fail = function(e) {
                            w._fail ? w._fail(e) : x.state = -1
                        }
                        ,
                        (o = w._completes).push((function() {
                            S()
                        }
                        )),
                        w.complete = function(e) {
                            for (var t = 0, a = o.length; t < a; ++t)
                                o[t]();
                            w._completes = []
                        }
                        ,
                        w)),
                        m.preVerifyStartTime = Q();
                    else {
                        x.state = 1;
                        for (var e = w._completes, t = 0, s = e.length; t < s; ++t)
                            e[t]();
                        w._completes = []
                    }
                    var o
                }
                )),
                A.invoke || (A.invoke = function(t, a, l) {
                    e.WeixinJSBridge && WeixinJSBridge.invoke(t, b(a), l)
                }
                ,
                A.on = function(t, a) {
                    e.WeixinJSBridge && WeixinJSBridge.on(t, a)
                }
                )
            },
            ready: function(e) {
                (0 != x.state || (w._completes.push(e),
                !r && h.debug)) && e()
            },
            error: function(e) {
                p < "6.0.2" || (-1 == x.state ? e(x.data) : w._fail = e)
            },
            checkJsApi: function(e) {
                _("checkJsApi", {
                    jsApiList: E(e.jsApiList)
                }, (e._complete = function(e) {
                    d && (a = e.checkResult) && (e.checkResult = JSON.parse(a));
                    var t, a = e, s = a.checkResult;
                    for (t in s) {
                        var o = l[t];
                        o && (s[o] = s[t],
                        delete s[t])
                    }
                }
                ,
                e))
            },
            onMenuShareTimeline: function(e) {
                I(a.onMenuShareTimeline, {
                    complete: function() {
                        _("shareTimeline", {
                            title: e.title || o,
                            desc: e.title || o,
                            img_url: e.imgUrl || "",
                            link: e.link || location.href,
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e)
                    }
                }, e)
            },
            onMenuShareAppMessage: function(e) {
                I(a.onMenuShareAppMessage, {
                    complete: function(t) {
                        "favorite" === t.scene ? _("sendAppMessage", {
                            title: e.title || o,
                            desc: e.desc || "",
                            link: e.link || location.href,
                            img_url: e.imgUrl || "",
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }) : _("sendAppMessage", {
                            title: e.title || o,
                            desc: e.desc || "",
                            link: e.link || location.href,
                            img_url: e.imgUrl || "",
                            type: e.type || "link",
                            data_url: e.dataUrl || ""
                        }, e)
                    }
                }, e)
            },
            onMenuShareQQ: function(e) {
                I(a.onMenuShareQQ, {
                    complete: function() {
                        _("shareQQ", {
                            title: e.title || o,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            },
            onMenuShareWeibo: function(e) {
                I(a.onMenuShareWeibo, {
                    complete: function() {
                        _("shareWeiboApp", {
                            title: e.title || o,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            },
            onMenuShareQZone: function(e) {
                I(a.onMenuShareQZone, {
                    complete: function() {
                        _("shareQZone", {
                            title: e.title || o,
                            desc: e.desc || "",
                            img_url: e.imgUrl || "",
                            link: e.link || location.href
                        }, e)
                    }
                }, e)
            },
            updateTimelineShareData: function(e) {
                _("updateTimelineShareData", {
                    title: e.title,
                    link: e.link,
                    imgUrl: e.imgUrl
                }, e)
            },
            updateAppMessageShareData: function(e) {
                _("updateAppMessageShareData", {
                    title: e.title,
                    desc: e.desc,
                    link: e.link,
                    imgUrl: e.imgUrl
                }, e)
            },
            startRecord: function(e) {
                _("startRecord", {}, e)
            },
            stopRecord: function(e) {
                _("stopRecord", {}, e)
            },
            onVoiceRecordEnd: function(e) {
                I("onVoiceRecordEnd", e)
            },
            playVoice: function(e) {
                _("playVoice", {
                    localId: e.localId
                }, e)
            },
            pauseVoice: function(e) {
                _("pauseVoice", {
                    localId: e.localId
                }, e)
            },
            stopVoice: function(e) {
                _("stopVoice", {
                    localId: e.localId
                }, e)
            },
            onVoicePlayEnd: function(e) {
                I("onVoicePlayEnd", e)
            },
            uploadVoice: function(e) {
                _("uploadVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            downloadVoice: function(e) {
                _("downloadVoice", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            translateVoice: function(e) {
                _("translateVoice", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            chooseImage: function(e) {
                _("chooseImage", {
                    scene: "1|2",
                    count: e.count || 9,
                    sizeType: e.sizeType || ["original", "compressed"],
                    sourceType: e.sourceType || ["album", "camera"]
                }, (e._complete = function(e) {
                    if (d) {
                        var t = e.localIds;
                        try {
                            t && (e.localIds = JSON.parse(t))
                        } catch (a) {}
                    }
                }
                ,
                e))
            },
            getLocation: function(e) {
                e = e || {},
                _(a.getLocation, {
                    type: e.type || "wgs84"
                }, (e._complete = function(e) {
                    delete e.type
                }
                ,
                e))
            },
            previewImage: function(e) {
                _(a.previewImage, {
                    current: e.current,
                    urls: e.urls
                }, e)
            },
            uploadImage: function(e) {
                _("uploadImage", {
                    localId: e.localId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            downloadImage: function(e) {
                _("downloadImage", {
                    serverId: e.serverId,
                    isShowProgressTips: 0 == e.isShowProgressTips ? 0 : 1
                }, e)
            },
            getLocalImgData: function(e) {
                !1 === y ? (y = !0,
                _("getLocalImgData", {
                    localId: e.localId
                }, (e._complete = function(e) {
                    var t;
                    y = !1,
                    0 < v.length && (t = v.shift(),
                    wx.getLocalImgData(t))
                }
                ,
                e))) : v.push(e)
            },
            getNetworkType: function(e) {
                _("getNetworkType", {}, (e._complete = function(e) {
                    var t = e
                      , a = (e = t.errMsg,
                    t.errMsg = "getNetworkType:ok",
                    t.subtype);
                    if (delete t.subtype,
                    a)
                        t.networkType = a;
                    else {
                        a = e.indexOf(":");
                        var l = e.substring(a + 1);
                        switch (l) {
                        case "wifi":
                        case "edge":
                        case "wwan":
                            t.networkType = l;
                            break;
                        default:
                            t.errMsg = "getNetworkType:fail"
                        }
                    }
                }
                ,
                e))
            },
            openLocation: function(e) {
                _("openLocation", {
                    latitude: e.latitude,
                    longitude: e.longitude,
                    name: e.name || "",
                    address: e.address || "",
                    scale: e.scale || 28,
                    infoUrl: e.infoUrl || ""
                }, e)
            },
            hideOptionMenu: function(e) {
                _("hideOptionMenu", {}, e)
            },
            showOptionMenu: function(e) {
                _("showOptionMenu", {}, e)
            },
            closeWindow: function(e) {
                _("closeWindow", {}, e = e || {})
            },
            hideMenuItems: function(e) {
                _("hideMenuItems", {
                    menuList: e.menuList
                }, e)
            },
            showMenuItems: function(e) {
                _("showMenuItems", {
                    menuList: e.menuList
                }, e)
            },
            hideAllNonBaseMenuItem: function(e) {
                _("hideAllNonBaseMenuItem", {}, e)
            },
            showAllNonBaseMenuItem: function(e) {
                _("showAllNonBaseMenuItem", {}, e)
            },
            scanQRCode: function(e) {
                _("scanQRCode", {
                    needResult: (e = e || {}).needResult || 0,
                    scanType: e.scanType || ["qrCode", "barCode"]
                }, (e._complete = function(e) {
                    var t;
                    u && (t = e.resultStr) && (t = JSON.parse(t),
                    e.resultStr = t && t.scan_code && t.scan_code.scan_result)
                }
                ,
                e))
            },
            openAddress: function(e) {
                _(a.openAddress, {}, (e._complete = function(e) {
                    e.postalCode = e.addressPostalCode,
                    delete e.addressPostalCode,
                    e.provinceName = e.proviceFirstStageName,
                    delete e.proviceFirstStageName,
                    e.cityName = e.addressCitySecondStageName,
                    delete e.addressCitySecondStageName,
                    e.countryName = e.addressCountiesThirdStageName,
                    delete e.addressCountiesThirdStageName,
                    e.detailInfo = e.addressDetailInfo,
                    delete e.addressDetailInfo
                }
                ,
                e))
            },
            openProductSpecificView: function(e) {
                _(a.openProductSpecificView, {
                    pid: e.productId,
                    view_type: e.viewType || 0,
                    ext_info: e.extInfo
                }, e)
            },
            addCard: function(e) {
                for (var t = e.cardList, l = [], s = 0, o = t.length; s < o; ++s) {
                    var i = {
                        card_id: (i = t[s]).cardId,
                        card_ext: i.cardExt
                    };
                    l.push(i)
                }
                _(a.addCard, {
                    card_list: l
                }, (e._complete = function(e) {
                    if (t = e.card_list) {
                        for (var t, a = 0, l = (t = JSON.parse(t)).length; a < l; ++a) {
                            var s = t[a];
                            s.cardId = s.card_id,
                            s.cardExt = s.card_ext,
                            s.isSuccess = !!s.is_succ,
                            delete s.card_id,
                            delete s.card_ext,
                            delete s.is_succ
                        }
                        e.cardList = t,
                        delete e.card_list
                    }
                }
                ,
                e))
            },
            chooseCard: function(e) {
                _("chooseCard", {
                    app_id: h.appId,
                    location_id: e.shopId || "",
                    sign_type: e.signType || "SHA1",
                    card_id: e.cardId || "",
                    card_type: e.cardType || "",
                    card_sign: e.cardSign,
                    time_stamp: e.timestamp + "",
                    nonce_str: e.nonceStr
                }, (e._complete = function(e) {
                    e.cardList = e.choose_card_info,
                    delete e.choose_card_info
                }
                ,
                e))
            },
            openCard: function(e) {
                for (var t = e.cardList, l = [], s = 0, o = t.length; s < o; ++s) {
                    var i = {
                        card_id: (i = t[s]).cardId,
                        code: i.code
                    };
                    l.push(i)
                }
                _(a.openCard, {
                    card_list: l
                }, e)
            },
            consumeAndShareCard: function(e) {
                _(a.consumeAndShareCard, {
                    consumedCardId: e.cardId,
                    consumedCode: e.code
                }, e)
            },
            chooseWXPay: function(e) {
                _(a.chooseWXPay, U(e), e),
                S({
                    jsApiName: "chooseWXPay"
                })
            },
            openEnterpriseRedPacket: function(e) {
                _(a.openEnterpriseRedPacket, U(e), e)
            },
            startSearchBeacons: function(e) {
                _(a.startSearchBeacons, {
                    ticket: e.ticket
                }, e)
            },
            stopSearchBeacons: function(e) {
                _(a.stopSearchBeacons, {}, e)
            },
            onSearchBeacons: function(e) {
                I(a.onSearchBeacons, e)
            },
            openEnterpriseChat: function(e) {
                _("openEnterpriseChat", {
                    useridlist: e.userIds,
                    chatname: e.groupName
                }, e)
            },
            launchMiniProgram: function(e) {
                _("launchMiniProgram", {
                    targetAppId: e.targetAppId,
                    path: function(e) {
                        var t;
                        if ("string" == typeof e && 0 < e.length)
                            return t = e.split("?")[0],
                            t += ".html",
                            void 0 !== (e = e.split("?")[1]) ? t + "?" + e : t
                    }(e.path),
                    envVersion: e.envVersion
                }, e)
            },
            openBusinessView: function(e) {
                _("openBusinessView", {
                    businessType: e.businessType,
                    queryString: e.queryString || "",
                    envVersion: e.envVersion
                }, (e._complete = function(e) {
                    if (d) {
                        var t = e.extraData;
                        if (t)
                            try {
                                e.extraData = JSON.parse(t)
                            } catch (a) {
                                e.extraData = {}
                            }
                    }
                }
                ,
                e))
            },
            miniProgram: {
                navigateBack: function(e) {
                    e = e || {},
                    L((function() {
                        _("invokeMiniProgramAPI", {
                            name: "navigateBack",
                            arg: {
                                delta: e.delta || 1
                            }
                        }, e)
                    }
                    ))
                },
                navigateTo: function(e) {
                    L((function() {
                        _("invokeMiniProgramAPI", {
                            name: "navigateTo",
                            arg: {
                                url: e.url
                            }
                        }, e)
                    }
                    ))
                },
                redirectTo: function(e) {
                    L((function() {
                        _("invokeMiniProgramAPI", {
                            name: "redirectTo",
                            arg: {
                                url: e.url
                            }
                        }, e)
                    }
                    ))
                },
                switchTab: function(e) {
                    L((function() {
                        _("invokeMiniProgramAPI", {
                            name: "switchTab",
                            arg: {
                                url: e.url
                            }
                        }, e)
                    }
                    ))
                },
                reLaunch: function(e) {
                    L((function() {
                        _("invokeMiniProgramAPI", {
                            name: "reLaunch",
                            arg: {
                                url: e.url
                            }
                        }, e)
                    }
                    ))
                },
                postMessage: function(e) {
                    L((function() {
                        _("invokeMiniProgramAPI", {
                            name: "postMessage",
                            arg: e.data || {}
                        }, e)
                    }
                    ))
                },
                getEnv: function(t) {
                    L((function() {
                        t({
                            miniprogram: "miniprogram" === e.__wxjs_environment
                        })
                    }
                    ))
                }
            }
        },
        k = 1,
        C = {},
        s.addEventListener("error", (function(e) {
            var t, a, l;
            d || (l = (t = e.target).tagName,
            a = t.src,
            "IMG" != l && "VIDEO" != l && "AUDIO" != l && "SOURCE" != l) || -1 != a.indexOf("wxlocalresource://") && (e.preventDefault(),
            e.stopPropagation(),
            (l = t["wx-id"]) || (l = k++,
            t["wx-id"] = l),
            C[l] || (C[l] = !0,
            wx.ready((function() {
                wx.getLocalImgData({
                    localId: a,
                    success: function(e) {
                        t.src = e.localData
                    }
                })
            }
            ))))
        }
        ), !0),
        s.addEventListener("load", (function(e) {
            var t;
            d || (t = (e = e.target).tagName,
            e.src,
            "IMG" != t && "VIDEO" != t && "AUDIO" != t && "SOURCE" != t) || (t = e["wx-id"]) && (C[t] = !1)
        }
        ), !0),
        t && (e.wx = e.jWeixin = A),
        A);
    function _(t, a, l) {
        e.WeixinJSBridge ? WeixinJSBridge.invoke(t, b(a), (function(e) {
            B(t, e, l)
        }
        )) : D(t, l)
    }
    function I(t, a, l) {
        e.WeixinJSBridge ? WeixinJSBridge.on(t, (function(e) {
            l && l.trigger && l.trigger(e),
            B(t, e, a)
        }
        )) : D(t, l || a)
    }
    function b(e) {
        return (e = e || {}).appId = h.appId,
        e.verifyAppId = h.appId,
        e.verifySignType = "sha1",
        e.verifyTimestamp = h.timestamp + "",
        e.verifyNonceStr = h.nonceStr,
        e.verifySignature = h.signature,
        e
    }
    function U(e) {
        return {
            timeStamp: e.timestamp + "",
            nonceStr: e.nonceStr,
            package: e.package,
            paySign: e.paySign,
            signType: e.signType || "SHA1"
        }
    }
    function B(e, t, a) {
        "openEnterpriseChat" != e && "openBusinessView" !== e || (t.errCode = t.err_code),
        delete t.err_code,
        delete t.err_desc,
        delete t.err_detail;
        var s, o, i, n, c = t.errMsg;
        switch (c || (c = t.err_msg,
        delete t.err_msg,
        o = c,
        (n = l[s = e]) && (s = n),
        n = "ok",
        o && (i = o.indexOf(":"),
        "access denied" != (n = (n = (n = -1 != (n = -1 != (n = "failed" == (n = "confirm" == (n = o.substring(i + 1)) ? "ok" : n) ? "fail" : n).indexOf("failed_") ? n.substring(7) : n).indexOf("fail_") ? n.substring(5) : n).replace(/_/g, " ")).toLowerCase()) && "no permission to execute" != n || (n = "permission denied"),
        "" == (n = "config" == s && "function not exist" == n ? "ok" : n)) && (n = "fail"),
        c = s + ":" + n,
        t.errMsg = c),
        (a = a || {})._complete && (a._complete(t),
        delete a._complete),
        c = t.errMsg || "",
        h.debug && !a.isInnerInvoke && alert(JSON.stringify(t)),
        e = c.indexOf(":"),
        c.substring(e + 1)) {
        case "ok":
            a.success && a.success(t);
            break;
        case "cancel":
            a.cancel && a.cancel(t);
            break;
        default:
            a.fail && a.fail(t)
        }
        a.complete && a.complete(t)
    }
    function E(e) {
        if (e) {
            for (var t = 0, l = e.length; t < l; ++t) {
                var s = e[t];
                (s = a[s]) && (e[t] = s)
            }
            return e
        }
    }
    function D(e, t) {
        var a;
        !h.debug || t && t.isInnerInvoke || ((a = l[e]) && (e = a),
        t && t._complete && delete t._complete,
        console.log('"' + e + '",', t || ""))
    }
    function S(e) {
        var t;
        n || c || h.debug || p < "6.0.2" || g.systemType < 0 || (t = new Image,
        g.appId = h.appId,
        g.initTime = m.initEndTime - m.initStartTime,
        g.preVerifyTime = m.preVerifyEndTime - m.preVerifyStartTime,
        A.getNetworkType({
            isInnerInvoke: !0,
            success: function(a) {
                g.networkType = a.networkType,
                a = "https://open.weixin.qq.com/sdk/report?v=" + g.version + "&o=" + g.isPreVerifyOk + "&s=" + g.systemType + "&c=" + g.clientVersion + "&a=" + g.appId + "&n=" + g.networkType + "&i=" + g.initTime + "&p=" + g.preVerifyTime + "&u=" + g.url + "&jsapi_name=" + (e ? e.jsApiName : ""),
                t.src = a
            }
        }))
    }
    function Q() {
        return (new Date).getTime()
    }
    function L(t) {
        r && (e.WeixinJSBridge ? t() : s.addEventListener && s.addEventListener("WeixinJSBridgeReady", t, !1))
    }
    console.warn("can't use weixin-js-sdk in server side")
}(Nt);
var Ht = Zt.exports;
const qt = e({
    __name: "index",
    setup(e) {
        x();
        const t = new URLSearchParams(window.location.search);
        y((async () => {
            const e = await a();
            if (i.value = !1,
            0 == e.data.enable_hongbao || 1 == e.data.enable_wxgzh)
                return;
            if ("micromessenger" == window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) {
                if (g.value = !0,
                null != t.get("noredirect"))
                    return;
                null == t.get("fans") && (window.location.href = `${window.location.origin}/store/weChatOauth?plat_id=${c.value}`);
                const e = await l();
                if (null == e.data)
                    return;
                const a = await s(e.data.id)
                  , i = await o();
                Ht.config(i.data),
                Ht.ready((function() {
                    Ht.checkJsApi({
                        jsApiList: ["requestMerchantTransfer"],
                        success: function(e) {
                            console.log("res", e.checkResult),
                            e.checkResult.requestMerchantTransfer ? WeixinJSBridge.invoke("requestMerchantTransfer", {
                                mchId: a.data.mchId,
                                appId: a.data.appId,
                                package: a.data.package
                            }, (function(e) {
                                e.err_msg
                            }
                            )) : alert("你的微信版本过低，请更新至最新版本。")
                        }
                    })
                }
                ))
            }
        }
        ));
        const a = async () => {
            try {
                const e = await h.get("/store/redpackSetting", {
                    params: {
                        shop_id: p.value,
                        plat_id: c.value
                    }
                });
                if (200 === e.data.code)
                    return e.data
            } catch (e) {
                console.log(e)
            }
        }
          , l = async () => {
            try {
                const e = await h.get("/store/weChatRedPacket", {
                    params: {
                        shop_id: p.value
                    }
                });
                if (200 === e.data.code)
                    return e.data
            } catch (e) {
                console.log(e)
            }
        }
          , s = async e => {
            try {
                const t = await h.post("/store/sendRedPacket", {
                    shop_id: p.value,
                    id: e
                });
                if (200 === t.data.code)
                    return t.data
            } catch (t) {
                console.log(t)
            }
        }
          , o = async () => {
            try {
                const e = await h.get("/store/weChatJssdk", {
                    params: {
                        plat_id: t.get("plat_id")
                    }
                });
                if (200 === e.data.code)
                    return e.data
            } catch (e) {
                console.log(e)
            }
        }
          , {inWxShade: i} = f(me())
          , n = m(-1);
        m("");
        const c = m(0)
          , p = m(0);
        (async () => {
            c.value = t.get("plat_id"),
            p.value = t.get("shop_id"),
            null != t.get("fans") && ae("fans", t.get("fans"));
            const e = await h.get("/store/shopInfo", {
                params: {
                    sid: t.get("suid"),
                    shop_id: t.get("shop_id"),
                    plat_id: t.get("plat_id")
                }
            });
            200 === e.data.code && (n.value = e.data.data.template_swich,
            6 == n.value && window.location.replace(`${window.location.origin}/users/?suid=${t.get("suid")}&plat_id=${t.get("plat_id")}&shop_id=${t.get("shop_id")}`))
        }
        )();
        const g = m(!1)
          , w = () => {
            g.value = !1,
            i.value = !0
        }
        ;
        return (e, t) => {
            const a = u
              , l = C(I("up-overlay"), le)
              , s = te;
            return r(),
            d(a, {
                class: "page-index"
            }, {
                default: S(( () => [1 == n.value ? (r(),
                d(at, {
                    key: 0
                })) : T("", !0), 2 == n.value ? (r(),
                d(ht, {
                    key: 1
                })) : T("", !0), 3 == n.value ? (r(),
                d(Kt, {
                    key: 2
                })) : T("", !0), 5 == n.value ? (r(),
                d(_t, {
                    key: 3
                })) : T("", !0), 4 == n.value ? (r(),
                d(zt, {
                    key: 4
                })) : T("", !0), Q(l, {
                    show: V(i)
                }, {
                    default: S(( () => [Q(a, {
                        class: "warp"
                    }, {
                        default: S(( () => [Q(a, null, {
                            default: S(( () => [R(" 请点击右上角 . . . "), L("br"), R(" 选择在浏览器中打开 ")])),
                            _: 1
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"]), Q(l, {
                    show: g.value
                }, {
                    default: S(( () => [Q(a, {
                        class: "hongbao"
                    }, {
                        default: S(( () => [Q(s, {
                            src: "data:image/png;base64,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",
                            mode: "aspectFit",
                            onClick: w
                        }), Q(a, {
                            class: "text-hongbao"
                        }, {
                            default: S(( () => [R("发抖音视频，领红包")])),
                            _: 1
                        }), Q(s, {
                            src: "data:image/png;base64,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",
                            style: {
                                width: "100rpx",
                                height: "100rpx",
                                "margin-top": "50rpx"
                            },
                            mode: "aspectFit",
                            onClick: t[0] || (t[0] = () => g.value = !1)
                        })])),
                        _: 1
                    })])),
                    _: 1
                }, 8, ["show"])])),
                _: 1
            })
        }
    }
}, [["__scopeId", "data-v-994be14a"]]);
export {qt as default};
