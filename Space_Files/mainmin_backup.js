function isMobileVersion() {
    return $(window).width() <= 1024
}
function isDesktopVersion() {
    return $(window).width() > 1024
}
function killAllPendingTimeouts() {
    for (var t = 0; t < timeouts.length; t++)
        clearTimeout(timeouts[t])
}
function handleVisibilityChange() {
    document.hidden || $(window).scrollTop(0)
}
function flash() {
    var t = 190;
    $("body").addClass("disable-transitions"),
    timeouts.push(setTimeout(function() {
        $("body").addClass("flash")
    }, 10)),
    timeouts.push(setTimeout(function() {
        $("body").removeClass("flash")
    }, 190)),
    timeouts.push(setTimeout(function() {
        $("body").addClass("flash")
    }, 380)),
    timeouts.push(setTimeout(function() {
        $("body").removeClass("flash")
    }, 570)),
    timeouts.push(setTimeout(function() {
        $("body").addClass("flash")
    }, 760)),
    timeouts.push(setTimeout(function() {
        $("body").removeClass("flash")
    }, 950)),
    timeouts.push(setTimeout(function() {
        $("body").addClass("flash")
    }, 1140)),
    timeouts.push(setTimeout(function() {
        $("body").removeClass("flash")
    }, 1330)),
    timeouts.push(setTimeout(function() {
        $("body").addClass("flash")
    }, 1520)),
    timeouts.push(setTimeout(function() {
        $("body").removeClass("disable-transitions"),
        $(".pane--overview").removeClass("pane--content-hidden")
    }, 1710)),
    isDesktopVersion() && (timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("01")
    }, 15.2)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("05")
    }, 76)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("10")
    }, 152)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("15")
    }, 228)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("20")
    }, 304)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("25")
    }, 380)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("30")
    }, 456)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("35")
    }, 760)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("40")
    }, 608)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("45")
    }, 684)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("50")
    }, 760)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("55")
    }, 836)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("60")
    }, 912)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("65")
    }, 988)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("70")
    }, 1064)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("75")
    }, 1140)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("80")
    }, 1216)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("85")
    }, 1292)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("90")
    }, 1368)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("99")
    }, 1444)),
    timeouts.push(setTimeout(function() {
        $(".pane__load-indicator").text("100")
    }, 1520)))
}
function goToScenario(t) {
    if ($(".navigation__list__item__button").removeClass("is-active"),
    $(".navigation__list__item:nth-child(" + t + ") .navigation__list__item__button").addClass("is-active"),
    killAllPendingTimeouts(),
    shouldFlash || $(window).width() > 1024 && (panesAreMoving = !0,
    setTimeout(function() {
        audio5js.load("audio/pane-move.wav"),
        audio5js.play(),
        setTimeout(function() {
            panesAreMoving = !1
        }, 800)
    }, 500)),
    currentScenarioNumber === flashScenarioNumber && t != flashScenarioNumber ? ($("body").addClass("disable-transitions"),
    timeouts.push(setTimeout(function() {
        $("body").removeClass("flash")
    }, 100)),
    timeouts.push(setTimeout(function() {
        $("body").removeClass("disable-transitions")
    }, 101)),
    timeouts.push(setTimeout(function() {
        $("main").removeClass("main--scenario-1 main--scenario-2 main--scenario-3 main--scenario-4").addClass("main--scenario-" + t)
    }, 200))) : ($("main").removeClass("main--scenario-1 main--scenario-2 main--scenario-3 main--scenario-4").addClass("main--scenario-" + t),
    isDesktopVersion() && t === flashScenarioNumber && shouldFlash && (setTimeout(function() {
        $(window).width() > 1024 && (audio5js.load("audio/generate-ai.wav"),
        audio5js.play())
    }, 1e3),
    resultFormDelay = 2e3,
    timeouts.push(setTimeout(flash, 1e3)),
    shouldFlash = !1)),
    1 === currentScenarioNumber && $(".pane__video")[0].pause(),
    1 === t && $(".pane__video")[0].play(),
    2 === t && (assemblyFormInitialized && (assemblyFormInitialized = !1),
    initAssemblyForm()),
    3 === t) {
        var e = 1e3;
        isMobileVersion() && (e = 1),
        setTimeout(function() {
            openOverviewPane()
        }, e)
    } else
        closeOverviewPane();
    isMobileVersion() && ($(window).scrollTop(0),
    $(".pane--overview").addClass("is-hidden")),
    currentScenarioNumber = t
}
function initAssemblyForm() {
    assemblyFormInitialized || ($.getJSON(apiLocation + "accounts/1/forms/2?include=questions,questions.answer_options.json", function(t) {
        var e = {};
        $.each(t.questions, function(t, n) {
            var i = "";
            if ("select" === n.question_type) {
                i += '<select name="' + n.id + '" cf-questions="' + questionCopy[n.question].question + '">';
                var s = {}
                  , o = n;
                $.each(n.answer_options, function(t, e) {
                    var n = "";
                    "what_form" == o.question && (n = 'cf-image="img/illustrations/form/state-' + e.answer + '.png"'),
                    s[e.position] = '<option value="' + e.id + '" ' + n + ">" + questionCopy[o.question].answers[e.answer] + "</option>"
                }),
                $.each(s, function(t, e) {
                    i += e
                }),
                i += "</select>"
            } else
                "text" === n.question_type && (i += '<input type="text" name="' + n.id + '" cf-questions="' + questionCopy[n.question].question + '">');
            e[n.position] = i
        }),
        $.each(e, function(t, e) {
            $(".pane--step-2.pane--main form").append(e)
        });
        var n = new cf.EventDispatcher;
        n.addEventListener(cf.FlowEvents.FLOW_UPDATE, function(t) {
            $(window).width() > 1024 && (audio5js.load("audio/new-message.wav"),
            audio5js.play())
        }, !1);
        var i = $(".pane--step-2.pane--main form").conversationalForm({
            eventDispatcher: n,
            context: $(".pane--step-2.pane--main .pane__inner")[0],
            preventAutoStart: !0,
            loadExternalStyleSheet: !1,
            flowStepCallback: function(t, e, n) {
                "21" === t.tag.name && i.doSubmitForm(),
                "22" === t.tag.name ? "63" == t.tag.value.toString() ? e() : "63,64" == t.tag.value.toString() && i.doSubmitForm() : e()
            },
            submitCallback: function() {
                destroyResultForm(),
                sendSubmission.submission.questions = $(".pane--step-2.pane--main form").serializeObject(),
                sendSubmission.submission.questions[23] || (sendSubmission.submission.questions[23] = "User doesn't want to stay in the loop"),
                $.ajax({
                    type: "POST",
                    url: apiLocation + "accounts/1/forms/2/submissions",
                    data: sendSubmission,
                    success: function(t, e, n) {
                        receivedSubmissionId = t.id,
                        Cookies.set("receivedSubmissionId", receivedSubmissionId),
                        shouldFlash = !0,
                        i.addRobotChatResponse("One sec&hellip; we&rsquo;re handling your results."),
                        $(".pane--overview").addClass("pane--content-hidden"),
                        isDesktopVersion() && $(".pane--overview").append('<div class="pane__load-indicator">00</div>'),
                        setTimeout(function() {
                            goToScenario(3)
                        }, msBetweenResponses)
                    }
                })
            }
        });
        setTimeout(function() {
            i.addRobotChatResponse("Hej!"),
            $(window).width() > 1024 && (audio5js.load("audio/new-message.wav"),
            audio5js.play())
        }, 1 * msBetweenResponses),
        setTimeout(function() {
            i.addRobotChatResponse("SPACE10 are curious to learn how you feel about Artificial Intelligence and how you would like your personal AI to be. Let’s get going…"),
            $(window).width() > 1024 && (audio5js.load("audio/new-message.wav"),
            audio5js.play())
        }, 2 * msBetweenResponses),
        setTimeout(function() {
            i.start()
        }, 3 * msBetweenResponses)
    }),
    assemblyFormInitialized = !0)
}
function initResultForm() {
    resultFormInitialized || ($.getJSON(apiLocation + "accounts/1/forms/1/submissions/" + receivedSubmissionId + "?include=responses,responses.answer_option,text_responses", function(t) {
        var e = {};
        $.each(t.responses, function(t, n) {
            e[n.answer_option.question_id] = n.answer_option.answer
        }),
        robotResponse1 = "Hello, my name is " + t.text_responses[0].answer + ".",
        robotResponse2 = "I’m your ",
        robotResponse2 += resultsCopy[2][e[2]],
        robotResponse2 += " ",
        robotResponse2 += resultsCopy[6][e[6]],
        robotResponse2 += " AI companion who sees everything from a ",
        robotResponse2 += resultsCopy[4][e[4]],
        robotResponse2 += ", ",
        robotResponse2 += resultsCopy[3][e[3]],
        robotResponse2 += " perspective.",
        robotResponse3 = "So nice to meet you!",
        robotResponse4 = resultsCopy[7][e[7]],
        robotResponse4 += " ",
        robotResponse4 += resultsCopy[8][e[8]],
        resultForm = $(".pane--step-3.pane--main form").conversationalForm({
            context: $(".pane--step-3.pane--main .pane__inner")[0],
            loadExternalStyleSheet: !1,
            submitCallback: function() {}
        }),
        timeouts.push(setTimeout(function() {
            resultForm.addRobotChatResponse(robotResponse1)
        }, 1 * msBetweenResponses + resultFormDelay)),
        timeouts.push(setTimeout(function() {
            resultForm.addRobotChatResponse(robotResponse2)
        }, 2 * msBetweenResponses + resultFormDelay)),
        timeouts.push(setTimeout(function() {
            resultForm.addRobotChatResponse(robotResponse3)
        }, 3 * msBetweenResponses + resultFormDelay)),
        timeouts.push(setTimeout(function() {
            resultForm.addRobotChatResponse(robotResponse4)
        }, 4 * msBetweenResponses + resultFormDelay)),
        $(".pane--step-3.pane--main .share-button").attr("data-title", "Meet your AI").attr("data-url", siteUrl + "#" + receivedSubmissionId)
    }),
    resultFormInitialized = !0)
}
function destroyResultForm() {
    resultForm && (resultFormInitialized = !1,
    killAllPendingTimeouts(),
    resultForm.remove())
}
function openOverviewPane() {
    $(".pane--overview").removeClass("is-hidden"),
    isMobileVersion() && ($(".main").removeClass("main--scenario-3"),
    $(window).scrollTop(0))
}
function closeOverviewPane() {
    $(".pane--overview").addClass("is-hidden")
}
function closeShareList() {
    $(".share-list").removeClass("is-visible share-list--dark").css("margin-top", ""),
    $(".share-list__item__button").attr("data-title", "").attr("data-url", "")
}
function drawOverviewChart() {
    $(".statistics__item__chart").each(function() {
        var t = 120;
        $(this).parent().parent().hasClass("overview__snippet") && (t = 270);
        var e = [["Name", "Value"]]
          , n = [];
        $(this).siblings(".statistics__item__list").find(".statistics__item__list__item").each(function(t, i) {
            e.push([$(i).data("title"), $(i).data("amount")]),
            $(i).hasClass("is-highlighted") ? n.push({
                color: "black"
            }) : n.push({
                color: "#D8D8D8"
            })
        });
        var i = google.visualization.arrayToDataTable(e)
          , s = {
            legend: "none",
            pieHole: .5,
            pieSliceText: "none",
            slices: n,
            chartArea: {
                left: 0,
                top: 0,
                width: "100%",
                height: "100%"
            },
            width: t,
            height: t
        };
        new google.visualization.PieChart($(this)[0]).draw(i, s)
    })
}
function getRandomArbitrary(t, e) {
    return Math.floor(Math.random() * (e - t)) + t
}
function initAudio() {
    audio5js = new Audio5js({
        ready: function() {
            this.load("audio/error.wav"),
            this.load("audio/generate-ai.wav"),
            this.load("audio/link-hover-1.wav"),
            this.load("audio/link-hover-2.wav"),
            this.load("audio/link-hover-3.wav"),
            this.load("audio/new-message.wav"),
            this.load("audio/pane-move.wav")
        }
    })
}
!function(t, e, n) {
    "use strict";
    "undefined" != typeof module && module.exports ? module.exports = n(e, t) : "function" == typeof define && define.amd ? define(function() {
        return n(e, t)
    }) : t[e] = n(e, t)
}(window, "Audio5js", function(t, e) {
    "use strict";
    function n(t) {
        this.message = t
    }
    function i(t) {
        var e = {}, n;
        for (n in t)
            "object" == typeof t[n] ? e[n] = i(t[n]) : e[n] = t[n];
        return e
    }
    var s = e.ActiveXObject;
    n.prototype = new Error;
    var o = function(t, e) {
        var n, s = i(e);
        for (n in s)
            s.hasOwnProperty(n) && (t[n] = s[n]);
        return t
    }
      , a = function(t, e) {
        return o(t.prototype, e)
    }
      , r = {
        on: function(t, e, n) {
            this.subscribe(t, e, n, !1)
        },
        one: function(t, e, n) {
            this.subscribe(t, e, n, !0)
        },
        off: function(t, e) {
            if (void 0 !== this.channels[t]) {
                var n, i;
                for (n = 0,
                i = this.channels[t].length; n < i; n++) {
                    if (this.channels[t][n].fn === e) {
                        this.channels[t].splice(n, 1);
                        break
                    }
                }
            }
        },
        subscribe: function(t, e, n, i) {
            void 0 === this.channels && (this.channels = {}),
            this.channels[t] = this.channels[t] || [],
            this.channels[t].push({
                fn: e,
                ctx: n,
                once: i || !1
            })
        },
        trigger: function(t) {
            if (this.channels && this.channels.hasOwnProperty(t)) {
                for (var e = Array.prototype.slice.call(arguments, 1), n = []; this.channels[t].length > 0; ) {
                    var i = this.channels[t].shift();
                    "function" == typeof i.fn && i.fn.apply(i.ctx, e),
                    i.once || n.push(i)
                }
                this.channels[t] = n
            }
        }
    }
      , l = {
        flash_embed_code: function(e, n, i) {
            var o, a = '<param name="movie" value="' + n + "?playerInstance=window." + t + "_flash.instances['" + e + "']&datetime=" + i + '"/><param name="wmode" value="transparent"/><param name="allowscriptaccess" value="always" /></object>';
            return (o = s ? '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="1" height="1" id="' + e + '">' : '<object type="application/x-shockwave-flash" data="' + n + "?playerInstance=window." + t + "_flash.instances['" + e + "']&datetime=" + i + '" width="1" height="1" id="' + e + '" >') + a
        },
        can_play: function(t) {
            var e = document.createElement("audio"), n;
            switch (t) {
            case "mp3":
                n = "audio/mpeg;";
                break;
            case "vorbis":
                n = 'audio/ogg; codecs="vorbis"';
                break;
            case "opus":
                n = 'audio/ogg; codecs="opus"';
                break;
            case "webm":
                n = 'audio/webm; codecs="vorbis"';
                break;
            case "mp4":
                n = 'audio/mp4; codecs="mp4a.40.5"';
                break;
            case "wav":
                n = 'audio/wav; codecs="1"';
                break
            }
            if (void 0 !== n) {
                if ("mp3" === t && navigator.userAgent.match(/Android/i) && navigator.userAgent.match(/Firefox/i))
                    return !0;
                try {
                    return !!e.canPlayType && "" !== e.canPlayType(n)
                } catch (t) {
                    return !1
                }
            }
            return !1
        },
        has_flash: function() {
            var t = !1;
            if (navigator.plugins && navigator.plugins.length && navigator.plugins["Shockwave Flash"])
                t = !0;
            else if (navigator.mimeTypes && navigator.mimeTypes.length) {
                var e = navigator.mimeTypes["application/x-shockwave-flash"];
                t = e && e.enabledPlugin
            } else
                try {
                    var n = new s("ShockwaveFlash.ShockwaveFlash");
                    t = "object" == typeof n
                } catch (t) {}
            return t
        }(),
        embedFlash: function(n, i) {
            var s = document.createElement("div");
            if (s.style.position = "absolute",
            s.style.width = "1px",
            s.style.height = "1px",
            s.style.top = "1px",
            document.body.appendChild(s),
            "object" == typeof e.swfobject) {
                var o = {
                    playerInstance: "window." + t + "_flash.instances['" + i + "']"
                }
                  , a = {
                    allowscriptaccess: "always",
                    wmode: "transparent"
                };
                s.innerHTML = '<div id="' + i + '"></div>',
                swfobject.embedSWF(n + "?ts=" + ((new Date).getTime() + Math.random()), i, "1", "1", "9.0.0", null, o, a)
            } else {
                var r = (new Date).getTime() + Math.random();
                s.innerHTML = this.flash_embed_code(i, n, r)
            }
            return document.getElementById(i)
        },
        formatTime: function(t) {
            var e = parseInt(t / 3600, 10) % 24, n = parseInt(t / 60, 10) % 60, i = parseInt(t % 60, 10), s, o = (n < 10 ? "0" + n : n) + ":" + (i < 10 ? "0" + i : i);
            return s = e > 0 ? (e < 10 ? "0" + e : e) + ":" + o : o
        }
    };
    l.use_flash = l.can_play("mp3");
    var u, c, h, p = {
        playing: !1,
        vol: 1,
        duration: 0,
        position: 0,
        load_percent: 0,
        seekable: !1,
        ready: null
    }, d = e[t + "_flash"] = e[t + "_flash"] || {
        instances: {},
        count: 0
    };
    c = function() {
        if (l.use_flash && !l.has_flash)
            throw new Error("Flash Plugin Missing")
    }
    ,
    c.prototype = {
        init: function(e) {
            d.count += 1,
            this.id = t + d.count,
            d.instances[this.id] = this,
            this.embed(e)
        },
        embed: function(t) {
            l.embedFlash(t, this.id)
        },
        eiReady: function() {
            this.audio = document.getElementById(this.id),
            this.trigger("ready")
        },
        eiLoadStart: function() {
            this.trigger("loadstart")
        },
        eiLoadedMetadata: function() {
            this.trigger("loadedmetadata")
        },
        eiCanPlay: function() {
            this.trigger("canplay")
        },
        eiTimeUpdate: function(t, e, n) {
            this.position = t,
            this.duration = e,
            this.seekable = n,
            this.trigger("timeupdate", t, this.seekable ? e : null)
        },
        eiProgress: function(t, e, n) {
            this.load_percent = t,
            this.duration = e,
            this.seekable = n,
            this.trigger("progress", t)
        },
        eiLoadError: function(t) {
            this.trigger("error", t)
        },
        eiPlay: function() {
            this.playing = !0,
            this.trigger("play"),
            this.trigger("playing")
        },
        eiPause: function() {
            this.playing = !1,
            this.trigger("pause")
        },
        eiEnded: function() {
            this.pause(),
            this.trigger("ended")
        },
        eiSeeking: function() {
            this.trigger("seeking")
        },
        eiSeeked: function() {
            this.trigger("seeked")
        },
        reset: function() {
            this.seekable = !1,
            this.duration = 0,
            this.position = 0,
            this.load_percent = 0
        },
        load: function(t) {
            this.reset(),
            this.audio.load(t)
        },
        play: function() {
            this.audio.pplay()
        },
        pause: function() {
            this.audio.ppause()
        },
        volume: function(t) {
            if (void 0 === t || isNaN(parseInt(t, 10)))
                return this.vol;
            this.audio.setVolume(t),
            this.vol = t
        },
        seek: function(t) {
            try {
                this.audio.seekTo(t),
                this.position = t
            } catch (t) {}
        },
        destroyAudio: function() {
            this.audio && (this.pause(),
            this.audio.parentNode.removeChild(this.audio),
            delete d.instances[this.id],
            delete this.audio)
        }
    },
    a(c, r),
    a(c, p),
    h = function() {}
    ,
    h.prototype = {
        init: function() {
            this.trigger("ready")
        },
        createAudio: function() {
            this.audio = new Audio,
            this.audio.autoplay = !1,
            this.audio.preload = "auto",
            this.audio.autobuffer = !0,
            this.bindEvents()
        },
        destroyAudio: function() {
            if (this.audio) {
                this.pause(),
                this.unbindEvents();
                try {
                    this.audio.setAttribute("src", "")
                } finally {
                    delete this.audio
                }
            }
        },
        setupEventListeners: function() {
            this.listeners = {
                loadstart: this.onLoadStart.bind(this),
                canplay: this.onLoad.bind(this),
                loadedmetadata: this.onLoadedMetadata.bind(this),
                play: this.onPlay.bind(this),
                playing: this.onPlaying.bind(this),
                pause: this.onPause.bind(this),
                ended: this.onEnded.bind(this),
                error: this.onError.bind(this),
                timeupdate: this.onTimeUpdate.bind(this),
                seeking: this.onSeeking.bind(this),
                seeked: this.onSeeked.bind(this)
            }
        },
        bindEvents: function() {
            void 0 === this.listeners && this.setupEventListeners(),
            this.audio.addEventListener("loadstart", this.listeners.loadstart, !1),
            this.audio.addEventListener("canplay", this.listeners.canplay, !1),
            this.audio.addEventListener("loadedmetadata", this.listeners.loadedmetadata, !1),
            this.audio.addEventListener("play", this.listeners.play, !1),
            this.audio.addEventListener("playing", this.listeners.playing, !1),
            this.audio.addEventListener("pause", this.listeners.pause, !1),
            this.audio.addEventListener("ended", this.listeners.ended, !1),
            this.audio.addEventListener("error", this.listeners.error, !1),
            this.audio.addEventListener("timeupdate", this.listeners.timeupdate, !1),
            this.audio.addEventListener("seeking", this.listeners.seeking, !1),
            this.audio.addEventListener("seeked", this.listeners.seeked, !1)
        },
        unbindEvents: function() {
            this.audio.removeEventListener("loadstart", this.listeners.loadstart),
            this.audio.removeEventListener("canplay", this.listeners.canplay),
            this.audio.removeEventListener("loadedmetadata", this.listeners.loadedmetadata),
            this.audio.removeEventListener("play", this.listeners.play),
            this.audio.removeEventListener("playing", this.listeners.playing),
            this.audio.removeEventListener("pause", this.listeners.pause),
            this.audio.removeEventListener("ended", this.listeners.ended),
            this.audio.removeEventListener("error", this.listeners.error),
            this.audio.removeEventListener("timeupdate", this.listeners.timeupdate),
            this.audio.removeEventListener("seeking", this.listeners.seeking),
            this.audio.removeEventListener("seeked", this.listeners.seeked)
        },
        onLoadStart: function() {
            this.trigger("loadstart")
        },
        onLoad: function() {
            if (!this.audio)
                return setTimeout(this.onLoad.bind(this), 100);
            this.seekable = this.audio.seekable && this.audio.seekable.length > 0,
            this.seekable && (this.timer = setInterval(this.onProgress.bind(this), 250)),
            this.trigger("canplay")
        },
        onLoadedMetadata: function() {
            this.trigger("loadedmetadata")
        },
        onPlay: function() {
            this.playing = !0,
            this.trigger("play")
        },
        onPlaying: function() {
            this.playing = !0,
            this.trigger("playing")
        },
        onPause: function() {
            this.playing = !1,
            this.trigger("pause")
        },
        onEnded: function() {
            this.playing = !1,
            this.trigger("ended")
        },
        onTimeUpdate: function() {
            if (this.audio && this.playing) {
                try {
                    this.position = this.audio.currentTime,
                    this.duration = this.audio.duration === 1 / 0 ? null : this.audio.duration
                } catch (t) {}
                this.trigger("timeupdate", this.position, this.duration)
            }
        },
        onProgress: function() {
            this.audio && null !== this.audio.buffered && this.audio.buffered.length && (this.duration = this.audio.duration === 1 / 0 ? null : this.audio.duration,
            this.load_percent = parseInt(this.audio.buffered.end(this.audio.buffered.length - 1) / this.duration * 100, 10),
            this.trigger("progress", this.load_percent),
            this.load_percent >= 100 && this.clearLoadProgress())
        },
        onError: function(t) {
            this.trigger("error", t)
        },
        onSeeking: function() {
            this.trigger("seeking")
        },
        onSeeked: function() {
            this.trigger("seeked")
        },
        clearLoadProgress: function() {
            void 0 !== this.timer && (clearInterval(this.timer),
            delete this.timer)
        },
        reset: function() {
            this.clearLoadProgress(),
            this.seekable = !1,
            this.duration = 0,
            this.position = 0,
            this.load_percent = 0
        },
        load: function(t) {
            this.reset(),
            this.trigger("pause"),
            void 0 === this.audio && this.createAudio(),
            this.audio.setAttribute("src", t),
            this.audio.load()
        },
        play: function() {
            this.audio && this.audio.play()
        },
        pause: function() {
            this.audio && this.audio.pause()
        },
        volume: function(t) {
            if (void 0 === t || isNaN(parseInt(t, 10)))
                return this.vol;
            var e = t < 0 ? 0 : Math.min(1, t);
            this.audio.volume = e,
            this.vol = e
        },
        seek: function(t) {
            var e = this.playing;
            this.position = t,
            this.audio.currentTime = t,
            e ? this.play() : null !== this.audio.buffered && this.audio.buffered.length && this.trigger("timeupdate", this.position, this.duration)
        }
    },
    a(h, r),
    a(h, p);
    var m = {
        swf_path: "/swf/audiojs.swf",
        throw_errors: !0,
        format_time: !0,
        codecs: ["mp3"]
    };
    return u = function(t) {
        t = t || {};
        var e;
        for (e in m)
            m.hasOwnProperty(e) && !t.hasOwnProperty(e) && (t[e] = m[e]);
        this.init(t)
    }
    ,
    u.can_play = function(t) {
        return l.can_play(t)
    }
    ,
    u.prototype = {
        init: function(t) {
            this.ready = !1,
            this.settings = t,
            this.audio = this.getPlayer(),
            this.bindAudioEvents(),
            this.settings.use_flash ? this.audio.init(t.swf_path) : this.audio.init()
        },
        getPlayer: function() {
            var t, e, n, i;
            if (this.settings.use_flash)
                n = new c,
                this.settings.player = {
                    engine: "flash",
                    codec: "mp3"
                };
            else {
                for (t = 0,
                e = this.settings.codecs.length; t < e; t++)
                    if (i = this.settings.codecs[t],
                    u.can_play(i)) {
                        n = new h,
                        this.settings.use_flash = !1,
                        this.settings.player = {
                            engine: "html",
                            codec: i
                        };
                        break
                    }
                void 0 === n && (this.settings.use_flash = !u.can_play("mp3"),
                n = this.settings.use_flash ? new c : new h,
                this.settings.player = {
                    engine: this.settings.use_flash ? "flash" : "html",
                    codec: "mp3"
                })
            }
            return n
        },
        bindAudioEvents: function() {
            this.audio.on("ready", this.onReady, this),
            this.audio.on("loadstart", this.onLoadStart, this),
            this.audio.on("loadedmetadata", this.onLoadedMetadata, this),
            this.audio.on("play", this.onPlay, this),
            this.audio.on("pause", this.onPause, this),
            this.audio.on("ended", this.onEnded, this),
            this.audio.on("canplay", this.onCanPlay, this),
            this.audio.on("timeupdate", this.onTimeUpdate, this),
            this.audio.on("progress", this.onProgress, this),
            this.audio.on("error", this.onError, this),
            this.audio.on("seeking", this.onSeeking, this),
            this.audio.on("seeked", this.onSeeked, this)
        },
        unbindAudioEvents: function() {
            this.audio.off("ready", this.onReady),
            this.audio.off("loadstart", this.onLoadStart),
            this.audio.off("loadedmetadata", this.onLoadedMetadata),
            this.audio.off("play", this.onPlay),
            this.audio.off("pause", this.onPause),
            this.audio.off("ended", this.onEnded),
            this.audio.off("canplay", this.onCanPlay),
            this.audio.off("timeupdate", this.onTimeUpdate),
            this.audio.off("progress", this.onProgress),
            this.audio.off("error", this.onError),
            this.audio.off("seeking", this.onSeeking),
            this.audio.off("seeked", this.onSeeked)
        },
        load: function(t) {
            var e = this
              , n = function(t) {
                e.audio.load(t),
                e.trigger("load")
            };
            this.ready ? n(t) : this.on("ready", n)
        },
        play: function() {
            this.playing || this.audio.play()
        },
        pause: function() {
            this.playing && this.audio.pause()
        },
        playPause: function() {
            this[this.playing ? "pause" : "play"]()
        },
        volume: function(t) {
            if (void 0 === t || isNaN(parseInt(t, 10)))
                return this.vol;
            this.audio.volume(t),
            this.vol = t
        },
        seek: function(t) {
            this.audio.seek(t),
            this.position = t
        },
        destroy: function() {
            this.unbindAudioEvents(),
            this.audio.destroyAudio()
        },
        onReady: function() {
            this.ready = !0,
            "function" == typeof this.settings.ready && this.settings.ready.call(this, this.settings.player),
            this.trigger("ready")
        },
        onLoadStart: function() {
            this.trigger("loadstart")
        },
        onLoadedMetadata: function() {
            this.trigger("loadedmetadata")
        },
        onPlay: function() {
            this.playing = !0,
            this.trigger("play")
        },
        onPause: function() {
            this.playing = !1,
            this.trigger("pause")
        },
        onEnded: function() {
            this.playing = !1,
            this.trigger("ended")
        },
        onError: function() {
            var t = new n("Audio Error. Failed to Load Audio");
            if (this.settings.throw_errors)
                throw t;
            this.trigger("error", t)
        },
        onCanPlay: function() {
            this.trigger("canplay")
        },
        onSeeking: function() {
            this.trigger("seeking")
        },
        onSeeked: function() {
            this.trigger("seeked")
        },
        onTimeUpdate: function(t, e) {
            this.position = this.settings.format_time ? l.formatTime(t) : t,
            this.duration = this.settings.format_time && null !== e ? l.formatTime(e) : e,
            this.trigger("timeupdate", this.position, this.duration)
        },
        onProgress: function(t) {
            this.duration = this.audio.duration,
            this.load_percent = t,
            this.trigger("progress", t)
        }
    },
    a(u, r),
    a(u, p),
    u
}),
function(t) {
    function e() {}
    function n(t, e) {
        return function() {
            t.apply(e, arguments)
        }
    }
    function i(t) {
        if ("object" != typeof this)
            throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof t)
            throw new TypeError("not a function");
        this._state = 0,
        this._handled = !1,
        this._value = void 0,
        this._deferreds = [],
        u(t, this)
    }
    function s(t, e) {
        for (; 3 === t._state; )
            t = t._value;
        if (0 === t._state)
            return void t._deferreds.push(e);
        t._handled = !0,
        i._immediateFn(function() {
            var n = 1 === t._state ? e.onFulfilled : e.onRejected;
            if (null === n)
                return void (1 === t._state ? o : a)(e.promise, t._value);
            var i;
            try {
                i = n(t._value)
            } catch (t) {
                return void a(e.promise, t)
            }
            o(e.promise, i)
        })
    }
    function o(t, e) {
        try {
            if (e === t)
                throw new TypeError("A promise cannot be resolved with itself.");
            if (e && ("object" == typeof e || "function" == typeof e)) {
                var s = e.then;
                if (e instanceof i)
                    return t._state = 3,
                    t._value = e,
                    void r(t);
                if ("function" == typeof s)
                    return void u(n(s, e), t)
            }
            t._state = 1,
            t._value = e,
            r(t)
        } catch (e) {
            a(t, e)
        }
    }
    function a(t, e) {
        t._state = 2,
        t._value = e,
        r(t)
    }
    function r(t) {
        2 === t._state && 0 === t._deferreds.length && i._immediateFn(function() {
            t._handled || i._unhandledRejectionFn(t._value)
        });
        for (var e = 0, n = t._deferreds.length; e < n; e++)
            s(t, t._deferreds[e]);
        t._deferreds = null
    }
    function l(t, e, n) {
        this.onFulfilled = "function" == typeof t ? t : null,
        this.onRejected = "function" == typeof e ? e : null,
        this.promise = n
    }
    function u(t, e) {
        var n = !1;
        try {
            t(function(t) {
                n || (n = !0,
                o(e, t))
            }, function(t) {
                n || (n = !0,
                a(e, t))
            })
        } catch (t) {
            if (n)
                return;
            n = !0,
            a(e, t)
        }
    }
    var c = setTimeout;
    i.prototype.catch = function(t) {
        return this.then(null, t)
    }
    ,
    i.prototype.then = function(t, n) {
        var i = new this.constructor(e);
        return s(this, new l(t,n,i)),
        i
    }
    ,
    i.all = function(t) {
        var e = Array.prototype.slice.call(t);
        return new i(function(t, n) {
            function i(o, a) {
                try {
                    if (a && ("object" == typeof a || "function" == typeof a)) {
                        var r = a.then;
                        if ("function" == typeof r)
                            return void r.call(a, function(t) {
                                i(o, t)
                            }, n)
                    }
                    e[o] = a,
                    0 == --s && t(e)
                } catch (t) {
                    n(t)
                }
            }
            if (0 === e.length)
                return t([]);
            for (var s = e.length, o = 0; o < e.length; o++)
                i(o, e[o])
        }
        )
    }
    ,
    i.resolve = function(t) {
        return t && "object" == typeof t && t.constructor === i ? t : new i(function(e) {
            e(t)
        }
        )
    }
    ,
    i.reject = function(t) {
        return new i(function(e, n) {
            n(t)
        }
        )
    }
    ,
    i.race = function(t) {
        return new i(function(e, n) {
            for (var i = 0, s = t.length; i < s; i++)
                t[i].then(e, n)
        }
        )
    }
    ,
    i._immediateFn = "function" == typeof setImmediate && function(t) {
        setImmediate(t)
    }
    || function(t) {
        c(t, 0)
    }
    ,
    i._unhandledRejectionFn = function t(e) {
        "undefined" != typeof console && console && console.warn("Possible Unhandled Promise Rejection:", e)
    }
    ,
    i._setImmediateFn = function t(e) {
        i._immediateFn = e
    }
    ,
    i._setUnhandledRejectionFn = function t(e) {
        i._unhandledRejectionFn = e
    }
    ,
    "undefined" != typeof module && module.exports ? module.exports = i : t.Promise || (t.Promise = i)
}(this);
try {
    var ce = new window.CustomEvent("test");
    if (ce.preventDefault(),
    !0 !== ce.defaultPrevented)
        throw new Error("Could not prevent default")
} catch (t) {
    var CustomEvent = function(t, e) {
        var n, i;
        return e = e || {
            bubbles: !1,
            cancelable: !1,
            detail: void 0
        },
        n = document.createEvent("CustomEvent"),
        n.initCustomEvent(t, e.bubbles, e.cancelable, e.detail),
        i = n.preventDefault,
        n.preventDefault = function() {
            i.call(this);
            try {
                Object.defineProperty(this, "defaultPrevented", {
                    get: function() {
                        return !0
                    }
                })
            } catch (t) {
                this.defaultPrevented = !0
            }
        }
        ,
        n
    };
    CustomEvent.prototype = window.Event.prototype,
    window.CustomEvent = CustomEvent
}
!function(t) {
    if ("function" == typeof define && define.amd)
        define(["jquery"], t);
    else
        try {
            t(jQuery)
        } catch (t) {}
}(function($) {
    $.fn.conversationalForm = function(t) {
        if (t = t || {},
        t.formEl || (t.formEl = this[0]),
        !t.context) {
            var e = document.querySelectorAll("*[cf-context]");
            e[0] && (t.context = e[0])
        }
        return new cf.ConversationalForm(t)
    }
});
var cf;
!function(t) {
    var e = function() {
        function t() {}
        return t.lerp = function(t, e, n) {
            return (n - e) * t + e
        }
        ,
        t.norm = function(t, e, n) {
            return (t - e) / (n - e)
        }
        ,
        t.getXYFromMouseTouchEvent = function(t) {
            var e = null;
            return t.originalEvent ? e = t.originalEvent.touches || t.originalEvent.changedTouches : t.changedTouches && (e = t.changedTouches),
            e ? {
                x: e[0].pageX,
                y: e[0].pageY,
                touches: e[0]
            } : {
                x: t.pageX,
                y: t.pageY,
                touches: null
            }
        }
        ,
        t.getInnerTextOfElement = function(t) {
            var e = document.createElement("DIV");
            e.innerHTML = t.innerHTML;
            var n = e.textContent || e.innerText || "";
            return n = String(n).replace(/^\s+|\s+$/g, "")
        }
        ,
        t.getMouseEvent = function(t) {
            var e = [];
            return e.click = "ontouchstart"in window ? "touchstart" : "click",
            e.mousedown = "ontouchstart"in window ? "touchstart" : "mousedown",
            e.mouseup = "ontouchstart"in window ? "touchend" : "mouseup",
            e.mousemove = "ontouchstart"in window ? "touchmove" : "mousemove",
            e[t]
        }
        ,
        t.setEmojiLib = function(e, n) {
            void 0 === e && (e = "emojify"),
            void 0 === n && (n = "//cdnjs.cloudflare.com/ajax/libs/emojify.js/1.1.0/js/emojify.min.js");
            var i = document.head || document.getElementsByTagName("head")[0]
              , s = document.createElement("script");
            s.type = "text/javascript",
            s.async = !0,
            s.defer = !0,
            s.onload = function() {
                t.emojilib = window[e],
                t.emojilib && t.emojilib.setConfig({
                    img_dir: "https://cdnjs.cloudflare.com/ajax/libs/emojify.js/1.1.0/images/basic/"
                })
            }
            ,
            s.setAttribute("src", n),
            i.appendChild(s)
        }
        ,
        t.emojify = function(e) {
            return t.emojilib && (e = t.emojilib.replace(e)),
            e
        }
        ,
        t.setTransform = function(t, e) {
            t.style["-webkit-transform"] = e,
            t.style["-moz-transform"] = e,
            t.style["-ms-transform"] = e,
            t.style.transform = e
        }
        ,
        t
    }();
    e.caniuse = {
        fileReader: function() {
            return !!(window.File && window.FileReader && window.FileList && window.Blob)
        }
    },
    e.emojilib = null,
    t.Helpers = e
}(cf || (cf = {}));
var cf;
!function(t) {
    var e = function() {
        function t(t) {
            this._cf = t,
            this.target = document.createDocumentFragment()
        }
        return Object.defineProperty(t.prototype, "cf", {
            get: function() {
                return this._cf
            },
            enumerable: !0,
            configurable: !0
        }),
        t.prototype.addEventListener = function(t, e, n) {
            return this.target.addEventListener(t, e, n)
        }
        ,
        t.prototype.dispatchEvent = function(t) {
            return this.target.dispatchEvent(t)
        }
        ,
        t.prototype.removeEventListener = function(t, e, n) {
            this.target.removeEventListener(t, e, n)
        }
        ,
        t
    }();
    t.EventDispatcher = e
}(cf || (cf = {}));
var cf;
!function(t) {
    var e = function() {
        function t() {}
        return t.parseTag = function(t) {
            var e = document.createElement(t.tag);
            e.setAttribute("cf-formless", "");
            for (var n in t)
                "tag" !== n && e.setAttribute(n, t[n]);
            return e
        }
        ,
        t.parseGroupTag = function(e) {
            for (var n = t.parseTag(e), i = e.children, s = 0; s < i.length; s++) {
                var o = i[s]
                  , a = t.parseTag(o);
                n.appendChild(a)
            }
            return n
        }
        ,
        t.parseJSONIntoElements = function(e) {
            for (var n = document.createElement("form"), i = 0; i < e.length; i++) {
                var s = e[i]
                  , o = t.parseTag(s);
                if (s.children && s.children.length > 0)
                    for (var a = 0; a < s.children.length; a++) {
                        var r = t.parseTag(s.children[a]);
                        o.appendChild(r)
                    }
                n.appendChild(o)
            }
            return n
        }
        ,
        t.isElementFormless = function(t) {
            return !!t.hasAttribute("cf-formless")
        }
        ,
        t
    }();
    t.TagsParser = e
}(cf || (cf = {}));
var cf;
!function(t) {
    var e = function() {
        function t(t) {
            if (this.eventTarget = t.eventTarget,
            !this.eventTarget)
                throw new Error("this.eventTarget not set!! : " + this.constructor.name);
            this.setData(t),
            this.createElement()
        }
        return t.prototype.setData = function(t) {}
        ,
        t.prototype.createElement = function() {
            var t = document.createElement("template");
            return t.innerHTML = this.getTemplate(),
            this.el = t.firstChild || t.content.firstChild,
            this.el
        }
        ,
        t.prototype.getTemplate = function() {
            return "should be overwritten..."
        }
        ,
        t.prototype.dealloc = function() {
            this.el.parentNode.removeChild(this.el)
        }
        ,
        t
    }();
    t.BasicElement = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    t.ControlElementEvents = {
        SUBMIT_VALUE: "cf-basic-element-submit",
        PROGRESS_CHANGE: "cf-basic-element-progress",
        ON_FOCUS: "cf-basic-element-on-focus",
        ON_LOADED: "cf-basic-element-on-loaded"
    },
    t.ControlElementProgressStates = {
        BUSY: "cf-control-element-progress-BUSY",
        READY: "cf-control-element-progress-READY"
    };
    var e = function(e) {
        function n(t) {
            var n = e.call(this, t) || this;
            return n.animateInTimer = 0,
            n._partOfSeveralChoices = !1,
            n._focus = !1,
            n.onFocusCallback = n.onFocus.bind(n),
            n.el.addEventListener("focus", n.onFocusCallback, !1),
            n.onBlurCallback = n.onBlur.bind(n),
            n.el.addEventListener("blur", n.onBlurCallback, !1),
            n
        }
        return __extends(n, e),
        Object.defineProperty(n.prototype, "type", {
            get: function() {
                return "ControlElement"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "partOfSeveralChoices", {
            get: function() {
                return this._partOfSeveralChoices
            },
            set: function(t) {
                this._partOfSeveralChoices = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "value", {
            get: function() {
                var e = this.referenceTag.hasImage, n;
                if (e && !this.partOfSeveralChoices) {
                    var i = e ? "<img src='" + this.referenceTag.domElement.getAttribute("cf-image") + "'/>" : "";
                    n = "<div class='contains-image'>",
                    n += i,
                    n += "<span>" + t.Helpers.getInnerTextOfElement(this.el) + "</span>",
                    n += "</div>"
                } else
                    n = "<div><span>" + t.Helpers.getInnerTextOfElement(this.el) + "</span></div>";
                return n
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "positionVector", {
            get: function() {
                return this._positionVector
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "tabIndex", {
            set: function(t) {
                this.el.tabIndex = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "highlight", {
            get: function() {
                return this.el.classList.contains("highlight")
            },
            set: function(t) {
                this.el.classList.toggle("highlight", t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "focus", {
            get: function() {
                return this._focus
            },
            set: function(t) {
                this._focus = t,
                this._focus ? this.el.focus() : this.el.blur()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "visible", {
            get: function() {
                return !this.el.classList.contains("hide")
            },
            set: function(t) {
                t ? this.el.classList.remove("hide") : (this.el.classList.add("hide"),
                this.tabIndex = -1,
                this.highlight = !1)
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.onBlur = function(t) {
            this._focus = !1
        }
        ,
        n.prototype.onFocus = function(e) {
            this._focus = !0,
            t.ConversationalForm.illustrateFlow(this, "dispatch", t.ControlElementEvents.ON_FOCUS, this.referenceTag),
            this.eventTarget.dispatchEvent(new CustomEvent(t.ControlElementEvents.ON_FOCUS,{
                detail: this.positionVector
            }))
        }
        ,
        n.prototype.hasImage = function() {
            return !1
        }
        ,
        n.prototype.calcPosition = function() {
            var t = parseInt(window.getComputedStyle(this.el).getPropertyValue("margin-right"), 10);
            this._positionVector = {
                height: this.el.offsetHeight,
                width: this.el.offsetWidth + t,
                x: this.el.offsetLeft,
                y: this.el.offsetTop,
                el: this
            },
            this._positionVector.centerX = this._positionVector.x + .5 * this._positionVector.width,
            this._positionVector.centerY = this._positionVector.y + .5 * this._positionVector.height
        }
        ,
        n.prototype.setData = function(t) {
            this.referenceTag = t.referenceTag,
            e.prototype.setData.call(this, t)
        }
        ,
        n.prototype.animateIn = function() {
            clearTimeout(this.animateInTimer),
            this.el.classList.add("animate-in")
        }
        ,
        n.prototype.animateOut = function() {
            this.el.classList.add("animate-out")
        }
        ,
        n.prototype.onChoose = function() {
            t.ConversationalForm.illustrateFlow(this, "dispatch", t.ControlElementEvents.SUBMIT_VALUE, this.referenceTag),
            this.eventTarget.dispatchEvent(new CustomEvent(t.ControlElementEvents.SUBMIT_VALUE,{
                detail: this
            }))
        }
        ,
        n.prototype.dealloc = function() {
            this.el.removeEventListener("blur", this.onBlurCallback, !1),
            this.onBlurCallback = null,
            this.el.removeEventListener("focus", this.onFocusCallback, !1),
            this.onFocusCallback = null,
            e.prototype.dealloc.call(this)
        }
        ,
        n
    }(t.BasicElement);
    t.ControlElement = e
}(cf || (cf = {}));
var cf;
!function(t) {
    var e = function() {
        function e(e) {
            this.ignoreKeyboardInput = !1,
            this.rowIndex = -1,
            this.columnIndex = 0,
            this.elementWidth = 0,
            this.filterListNumberOfVisible = 0,
            this.listWidth = 0,
            this.el = e.el,
            this.eventTarget = e.eventTarget,
            this.list = this.el.getElementsByTagName("cf-list")[0],
            this.infoElement = e.infoEl,
            this.onScrollCallback = this.onScroll.bind(this),
            this.el.addEventListener("scroll", this.onScrollCallback, !1),
            this.onResizeCallback = this.onResize.bind(this),
            window.addEventListener("resize", this.onResizeCallback, !1),
            this.onElementFocusCallback = this.onElementFocus.bind(this),
            this.eventTarget.addEventListener(t.ControlElementEvents.ON_FOCUS, this.onElementFocusCallback, !1),
            this.onElementLoadedCallback = this.onElementLoaded.bind(this),
            this.eventTarget.addEventListener(t.ControlElementEvents.ON_LOADED, this.onElementLoadedCallback, !1),
            this.onChatReponsesUpdatedCallback = this.onChatReponsesUpdated.bind(this),
            this.eventTarget.addEventListener(t.ChatListEvents.CHATLIST_UPDATED, this.onChatReponsesUpdatedCallback, !1),
            this.onUserInputKeyChangeCallback = this.onUserInputKeyChange.bind(this),
            this.eventTarget.addEventListener(t.UserInputEvents.KEY_CHANGE, this.onUserInputKeyChangeCallback, !1),
            this.userInputUpdateCallback = this.onUserInputUpdate.bind(this),
            this.eventTarget.addEventListener(t.FlowEvents.USER_INPUT_UPDATE, this.userInputUpdateCallback, !1),
            this.listScrollController = new t.ScrollController({
                interactionListener: this.el,
                listToScroll: this.list,
                eventTarget: this.eventTarget,
                listNavButtons: this.el.getElementsByTagName("cf-list-button")
            })
        }
        return Object.defineProperty(e.prototype, "active", {
            get: function() {
                return this.elements && this.elements.length > 0
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "focus", {
            get: function() {
                if (!this.elements)
                    return !1;
                for (var t = this.getElements(), e = 0; e < t.length; e++) {
                    if (t[e].focus)
                        return !0
                }
                return !1
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "highlighted", {
            get: function() {
                if (!this.elements)
                    return !1;
                for (var t = this.getElements(), e = 0; e < t.length; e++) {
                    if (t[e].highlight)
                        return !0
                }
                return !1
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "disabled", {
            set: function(t) {
                t ? this.list.classList.add("disabled") : this.list.classList.remove("disabled")
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "length", {
            get: function() {
                return this.getElements().length
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.onScroll = function(t) {
            this.el.scrollLeft = 0
        }
        ,
        e.prototype.onElementLoaded = function(t) {
            this.onResize(null)
        }
        ,
        e.prototype.onElementFocus = function(t) {
            var e = t.detail
              , n = e.x + e.width < this.elementWidth ? 0 : e.x - e.width;
            n *= -1,
            this.updateRowColIndexFromVector(e),
            this.listScrollController.setScroll(n, 0)
        }
        ,
        e.prototype.updateRowColIndexFromVector = function(t) {
            for (var e = 0; e < this.tableableRows.length; e++)
                for (var n = this.tableableRows[e], i = 0; i < n.length; i++) {
                    var s = n[i];
                    if (s == t.el) {
                        this.rowIndex = e,
                        this.columnIndex = i;
                        break
                    }
                }
        }
        ,
        e.prototype.onChatReponsesUpdated = function(t) {
            this.animateElementsIn()
        }
        ,
        e.prototype.onUserInputKeyChange = function(e) {
            if (this.ignoreKeyboardInput)
                return void (this.ignoreKeyboardInput = !1);
            var n = e.detail
              , i = n.dto.input;
            if (this.active) {
                var s = -1 != [t.Dictionary.keyCodes.left, t.Dictionary.keyCodes.right, t.Dictionary.keyCodes.down, t.Dictionary.keyCodes.up].indexOf(n.keyCode);
                if (n.inputFieldActive && !s) {
                    var o = e.detail.dto
                      , a = o.input.getInputValue();
                    this.filterElementsFrom(a)
                } else
                    n.keyCode == t.Dictionary.keyCodes.left ? this.columnIndex-- : n.keyCode == t.Dictionary.keyCodes.right ? this.columnIndex++ : n.keyCode == t.Dictionary.keyCodes.down ? this.updateRowIndex(1) : n.keyCode == t.Dictionary.keyCodes.up ? this.updateRowIndex(-1) : n.keyCode != t.Dictionary.keyCodes.enter && n.keyCode != t.Dictionary.keyCodes.space || (this.tableableRows[this.rowIndex] && this.tableableRows[this.rowIndex][this.columnIndex] ? this.tableableRows[this.rowIndex][this.columnIndex].el.click() : this.tableableRows[0] && 1 == this.tableableRows[0].length && this.tableableRows[0][0].el.click()),
                    this.validateRowColIndexes() || i.setFocusOnInput()
            }
            i.active || !this.validateRowColIndexes() || !this.tableableRows || 0 != this.rowIndex && 1 != this.rowIndex ? i.active || i.setFocusOnInput() : this.tableableRows[this.rowIndex][this.columnIndex].focus = !0
        }
        ,
        e.prototype.validateRowColIndexes = function() {
            var t = this.el.classList.contains("two-row") ? 1 : 0;
            return -1 != this.rowIndex && this.tableableRows[this.rowIndex] ? (this.columnIndex < 0 && (this.columnIndex = this.tableableRows[this.rowIndex].length - 1),
            this.columnIndex > this.tableableRows[this.rowIndex].length - 1 && (this.columnIndex = 0),
            !0) : (this.resetTabList(),
            !1)
        }
        ,
        e.prototype.updateRowIndex = function(t) {
            var e = this.rowIndex;
            if (this.rowIndex += t,
            this.tableableRows[this.rowIndex])
                for (var n = this.tableableRows[e] ? this.tableableRows[e][this.columnIndex].positionVector.centerX : 0, i = this.tableableRows[this.rowIndex], s = 1e13, o = 0; o < i.length; o++) {
                    var a = i[o];
                    s > Math.abs(n - a.positionVector.centerX) && (s = Math.abs(n - a.positionVector.centerX),
                    this.columnIndex = o)
                }
        }
        ,
        e.prototype.resetTabList = function() {
            this.rowIndex = -1,
            this.columnIndex = -1
        }
        ,
        e.prototype.onUserInputUpdate = function(t) {
            if (this.el.classList.remove("animate-in"),
            this.infoElement.classList.remove("show"),
            this.elements)
                for (var e = this.getElements(), n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.animateOut()
                }
        }
        ,
        e.prototype.filterElementsFrom = function(e) {
            var n = e.toLowerCase().split(" ");
            -1 != n.indexOf("") && n.splice(n.indexOf(""), 1);
            var i = this.getElements();
            if (i.length > 1) {
                for (var s = [], o = 0; o < i.length; o++) {
                    var a = i[o];
                    a.highlight = !1;
                    for (var r = !0, l = 0; l < n.length; l++) {
                        var u = n[l];
                        r && (r = -1 != a.value.toLowerCase().indexOf(u))
                    }
                    a.visible = r,
                    r && a.visible && s.push(a)
                }
                this.infoElement.innerHTML = 0 == s.length ? t.Dictionary.get("input-no-filter").split("{input-value}").join(e) : "",
                0 == s.length ? this.infoElement.classList.add("show") : this.infoElement.classList.remove("show");
                this.filterListNumberOfVisible != s.length && (this.resize(),
                this.animateElementsIn()),
                this.filterListNumberOfVisible = s.length,
                "" != e && this.filterListNumberOfVisible > 0 && (s[0].highlight = !0)
            }
        }
        ,
        e.prototype.clickOnHighlighted = function() {
            for (var t = this.getElements(), e = 0; e < t.length; e++) {
                var n = t[e];
                if (n.highlight) {
                    n.el.click();
                    break
                }
            }
        }
        ,
        e.prototype.animateElementsIn = function() {
            if (this.elements) {
                var t = this.getElements();
                if (t.length > 0) {
                    this.el.classList.contains("animate-in") || this.el.classList.add("animate-in");
                    for (var e = 0; e < t.length; e++) {
                        t[e].animateIn()
                    }
                }
            }
        }
        ,
        e.prototype.getElements = function() {
            return this.elements && this.elements.length > 0 && "OptionsList" == this.elements[0].type ? this.elements[0].elements : this.elements
        }
        ,
        e.prototype.buildTabableRows = function() {
            this.tableableRows = [],
            this.resetTabList();
            var t = this.getElements();
            if (this.el.classList.contains("two-row")) {
                this.tableableRows[0] = [],
                this.tableableRows[1] = [];
                for (var e = 0; e < t.length; e++) {
                    var n = t[e];
                    n.visible && (n.positionVector.y < 30 ? this.tableableRows[0].push(n) : this.tableableRows[1].push(n))
                }
            } else {
                this.tableableRows[0] = [];
                for (var e = 0; e < t.length; e++) {
                    var n = t[e];
                    n.visible && this.tableableRows[0].push(n)
                }
            }
        }
        ,
        e.prototype.resetAfterErrorMessage = function() {
            this.currentControlElement && (this.currentControlElement.checked = !this.currentControlElement.checked,
            this.currentControlElement = null),
            this.disabled = !1
        }
        ,
        e.prototype.focusFrom = function(t) {
            this.tableableRows && (this.columnIndex = 0,
            "bottom" == t ? this.rowIndex = this.el.classList.contains("two-row") ? 1 : 0 : "top" == t && (this.rowIndex = 0),
            this.tableableRows[this.rowIndex] && this.tableableRows[this.rowIndex][this.columnIndex] ? (this.ignoreKeyboardInput = !0,
            this.tableableRows[this.rowIndex][this.columnIndex].focus = !0) : this.resetTabList())
        }
        ,
        e.prototype.updateStateOnElementsFromTag = function(t) {
            for (var e = 0; e < this.elements.length; e++) {
                var n = this.elements[e];
                if (n.referenceTag == t) {
                    this.updateStateOnElements(n);
                    break
                }
            }
        }
        ,
        e.prototype.updateStateOnElements = function(t) {
            if (this.currentControlElement = t,
            "RadioButton" == this.currentControlElement.type)
                for (var e = this.getElements(), n = 0; n < e.length; n++) {
                    var i = e[n];
                    i.checked = i == t
                }
            else if ("CheckboxButton" == this.currentControlElement.type)
                for (var e = this.getElements(), n = 0; n < e.length; n++) {
                    var i = e[n];
                    if (i == t) {
                        var s = i.referenceTag.domElement.checked;
                        i.checked = s
                    }
                }
        }
        ,
        e.prototype.reset = function() {
            this.el.classList.remove("one-row"),
            this.el.classList.remove("two-row")
        }
        ,
        e.prototype.getElement = function(t) {
            return this.elements[t]
        }
        ,
        e.prototype.getDTO = function() {
            var e = {
                text: void 0,
                controlElements: []
            };
            if (this.elements && this.elements.length > 0)
                switch (this.elements[0].type) {
                case "CheckboxButton":
                    for (var n = 0, i = [], s = 0; s < this.elements.length; s++) {
                        if (this.elements[s].checked && n++ > 1)
                            break
                    }
                    for (var s = 0; s < this.elements.length; s++) {
                        var o = this.elements[s];
                        o.checked && (n > 1 && (o.partOfSeveralChoices = !0),
                        i.push(o.value)),
                        e.controlElements.push(o)
                    }
                    e.text = t.Dictionary.parseAndGetMultiValueString(i);
                    break;
                case "RadioButton":
                    for (var s = 0; s < this.elements.length; s++) {
                        var a = this.elements[s];
                        a.checked && (e.text = a.value),
                        e.controlElements.push(a)
                    }
                    break;
                case "OptionsList":
                    var r = this.elements[0];
                    e.controlElements = r.getValue();
                    var i = [];
                    if (e.controlElements && e.controlElements[0])
                        for (var l = 0; l < e.controlElements.length; l++) {
                            var u = e.controlElements[l];
                            i.push(e.controlElements[l].value)
                        }
                    e.controlElements = r.elements,
                    e.text = t.Dictionary.parseAndGetMultiValueString(i);
                    break;
                case "UploadFileUI":
                    e.text = this.elements[0].getFilesAsString(),
                    e.controlElements.push(this.elements[0]);
                    break
                }
            return e
        }
        ,
        e.prototype.clearTagsAndReset = function() {
            if (this.reset(),
            this.elements)
                for (; this.elements.length > 0; )
                    this.elements.pop().dealloc()
        }
        ,
        e.prototype.buildTags = function(e) {
            var n = this;
            this.disabled = !1;
            var i = this.el.parentNode.getElementsByTagName("ul")[0]
              , s = this.el.parentNode.getElementsByTagName("ul")[1];
            this.clearTagsAndReset(),
            this.elements = [];
            for (var o = 0; o < e.length; o++) {
                var a = e[o];
                switch (a.type) {
                case "radio":
                    this.elements.push(new t.RadioButton({
                        referenceTag: a,
                        eventTarget: this.eventTarget
                    }));
                    break;
                case "checkbox":
                    this.elements.push(new t.CheckboxButton({
                        referenceTag: a,
                        eventTarget: this.eventTarget
                    }));
                    break;
                case "select":
                    this.elements.push(new t.OptionsList({
                        referenceTag: a,
                        context: this.list,
                        eventTarget: this.eventTarget
                    }));
                    break;
                case "input":
                default:
                    "file" == a.type && this.elements.push(new t.UploadFileUI({
                        referenceTag: a,
                        eventTarget: this.eventTarget
                    }));
                    break
                }
                if ("select" != a.type && this.elements.length > 0) {
                    var r = this.elements[this.elements.length - 1];
                    this.list.appendChild(r.el)
                }
            }
            var l = this.elements[0] && "OptionsList" == this.elements[0].type;
            this.filterListNumberOfVisible = l ? this.elements[0].elements.length : e.length,
            new Promise(function(t, e) {
                return n.resize(t, e)
            }
            ).then(function() {
                var e = n.el.classList.contains("one-row") ? 52 : n.el.classList.contains("two-row") ? 102 : 0
                  , i = {
                    height: e
                };
                t.ConversationalForm.illustrateFlow(n, "dispatch", t.UserInputEvents.CONTROL_ELEMENTS_ADDED, i),
                n.eventTarget.dispatchEvent(new CustomEvent(t.UserInputEvents.CONTROL_ELEMENTS_ADDED,{
                    detail: i
                }))
            })
        }
        ,
        e.prototype.onResize = function(t) {
            this.resize()
        }
        ,
        e.prototype.resize = function(t, e) {
            var n = this;
            this.list.style.width = "100%",
            this.el.classList.remove("resized"),
            this.el.classList.remove("one-row"),
            this.el.classList.remove("two-row"),
            this.elementWidth = 0,
            setTimeout(function() {
                n.listWidth = 0;
                var e = n.getElements();
                if (e && e.length > 0) {
                    for (var i = [], s = [], o = !1, a = 0; a < e.length; a++) {
                        var r = e[a];
                        r.visible && (r.calcPosition(),
                        n.listWidth += r.positionVector.width,
                        i.push(r.positionVector.x + r.positionVector.width),
                        s.push(r)),
                        r.hasImage() && (o = !0)
                    }
                    var l = n.el.offsetWidth
                      , u = n.listWidth > l;
                    u && !o ? (n.el.classList.add("two-row"),
                    n.listWidth = Math.max(l, Math.round(i[Math.floor(i.length / 2)] + 50)),
                    n.list.style.width = n.listWidth + "px") : n.el.classList.add("one-row"),
                    setTimeout(function() {
                        for (var i = 0; i < e.length; i++) {
                            var s = e[i];
                            s.visible && s.calcPosition()
                        }
                        u = n.listWidth > l;
                        for (var o = e.slice(), a = o.sort(function(t, e) {
                            var n = t.positionVector.y > e.positionVector.y;
                            return t.positionVector.x == e.positionVector.x ? n ? 1 : -1 : t.positionVector.x < e.positionVector.x ? -1 : 1
                        }), r = 0, i = 0; i < a.length; i++) {
                            var s = a[i];
                            s.visible ? s.tabIndex = 2 + r++ : s.tabIndex = -1
                        }
                        cancelAnimationFrame(n.rAF),
                        u ? n.el.classList.remove("hide-nav-buttons") : n.el.classList.add("hide-nav-buttons"),
                        n.elementWidth = l,
                        n.listScrollController.resize(n.listWidth, n.elementWidth),
                        n.buildTabableRows(),
                        n.el.classList.add("resized"),
                        t && t()
                    }, 0)
                }
            }, 0)
        }
        ,
        e.prototype.dealloc = function() {
            this.currentControlElement = null,
            this.tableableRows = null,
            cancelAnimationFrame(this.rAF),
            this.rAF = null,
            window.removeEventListener("resize", this.onResizeCallback, !1),
            this.onResizeCallback = null,
            this.el.removeEventListener("scroll", this.onScrollCallback, !1),
            this.onScrollCallback = null,
            this.eventTarget.removeEventListener(t.ControlElementEvents.ON_FOCUS, this.onElementFocusCallback, !1),
            this.onElementFocusCallback = null,
            this.eventTarget.removeEventListener(t.ChatListEvents.CHATLIST_UPDATED, this.onChatReponsesUpdatedCallback, !1),
            this.onChatReponsesUpdatedCallback = null,
            this.eventTarget.removeEventListener(t.UserInputEvents.KEY_CHANGE, this.onUserInputKeyChangeCallback, !1),
            this.onUserInputKeyChangeCallback = null,
            this.eventTarget.removeEventListener(t.FlowEvents.USER_INPUT_UPDATE, this.userInputUpdateCallback, !1),
            this.userInputUpdateCallback = null,
            this.eventTarget.removeEventListener(t.ControlElementEvents.ON_LOADED, this.onElementLoadedCallback, !1),
            this.onElementLoadedCallback = null,
            this.listScrollController.dealloc()
        }
        ,
        e
    }();
    t.ControlElements = e
}(cf || (cf = {}));
var cf;
!function(t) {
    var e = function() {
        function e(e) {
            this.listWidth = 0,
            this.visibleAreaWidth = 0,
            this.max = 0,
            this.interacting = !1,
            this.x = 0,
            this.xTarget = 0,
            this.startX = 0,
            this.startXTarget = 0,
            this.mouseSpeed = 0,
            this.mouseSpeedTarget = 0,
            this.direction = 0,
            this.directionTarget = 0,
            this.inputAccerlation = 0,
            this.inputAccerlationTarget = 0,
            this.interactionListener = e.interactionListener,
            this.eventTarget = e.eventTarget,
            this.listToScroll = e.listToScroll,
            this.prevButton = e.listNavButtons[0],
            this.nextButton = e.listNavButtons[1],
            this.onListNavButtonsClickCallback = this.onListNavButtonsClick.bind(this),
            this.prevButton.addEventListener("click", this.onListNavButtonsClickCallback, !1),
            this.nextButton.addEventListener("click", this.onListNavButtonsClickCallback, !1),
            this.documentLeaveCallback = this.documentLeave.bind(this),
            this.onInteractStartCallback = this.onInteractStart.bind(this),
            this.onInteractEndCallback = this.onInteractEnd.bind(this),
            this.onInteractMoveCallback = this.onInteractMove.bind(this),
            document.addEventListener("mouseleave", this.documentLeaveCallback, !1),
            document.addEventListener(t.Helpers.getMouseEvent("mouseup"), this.documentLeaveCallback, !1),
            this.interactionListener.addEventListener(t.Helpers.getMouseEvent("mousedown"), this.onInteractStartCallback, !1),
            this.interactionListener.addEventListener(t.Helpers.getMouseEvent("mouseup"), this.onInteractEndCallback, !1),
            this.interactionListener.addEventListener(t.Helpers.getMouseEvent("mousemove"), this.onInteractMoveCallback, !1)
        }
        return e.prototype.onListNavButtonsClick = function(t) {
            var e = t.currentTarget.getAttribute("direction");
            this.pushDirection("next" == e ? -1 : 1)
        }
        ,
        e.prototype.documentLeave = function(t) {
            this.onInteractEnd(t)
        }
        ,
        e.prototype.onInteractStart = function(e) {
            var n = t.Helpers.getXYFromMouseTouchEvent(e);
            this.interacting = !0,
            this.startX = n.x,
            this.startXTarget = this.startX,
            this.inputAccerlation = 0,
            this.render()
        }
        ,
        e.prototype.onInteractEnd = function(t) {
            this.interacting = !1
        }
        ,
        e.prototype.onInteractMove = function(e) {
            if (this.interacting) {
                var n = t.Helpers.getXYFromMouseTouchEvent(e)
                  , i = n.x - this.startX
                  , s = 6.2;
                this.inputAccerlationTarget = 6.2 * i,
                this.directionTarget = this.inputAccerlationTarget < 0 ? -1 : 1,
                this.startXTarget = n.x
            }
        }
        ,
        e.prototype.render = function() {
            var n = this;
            this.rAF && cancelAnimationFrame(this.rAF),
            this.startX += .2 * (this.startXTarget - this.startX),
            this.inputAccerlation += (this.inputAccerlationTarget - this.inputAccerlation) * (this.interacting ? Math.min(e.accerlation + .1, 1) : e.accerlation);
            var i = .25;
            this.inputAccerlationTarget *= .25,
            this.direction += .2 * (this.directionTarget - this.direction),
            this.mouseSpeed += .2 * (this.mouseSpeedTarget - this.mouseSpeed),
            this.direction += this.mouseSpeed,
            this.xTarget += .05 * this.inputAccerlation,
            this.xTarget > 0 && (this.xTarget += (0 - this.xTarget) * t.Helpers.lerp(e.accerlation, .3, .8)),
            this.xTarget < this.max && (this.xTarget += (this.max - this.xTarget) * t.Helpers.lerp(e.accerlation, .3, .8)),
            this.x += .4 * (this.xTarget - this.x);
            var s = Math.round(this.x);
            s < 0 && (this.prevButton.classList.contains("active") || this.prevButton.classList.add("active"),
            this.prevButton.classList.contains("cf-gradient") || this.prevButton.classList.add("cf-gradient")),
            0 == s && (this.prevButton.classList.contains("active") && this.prevButton.classList.remove("active"),
            this.prevButton.classList.contains("cf-gradient") && this.prevButton.classList.remove("cf-gradient")),
            s > this.max && (this.nextButton.classList.contains("active") || this.nextButton.classList.add("active"),
            this.nextButton.classList.contains("cf-gradient") || this.nextButton.classList.add("cf-gradient")),
            s <= this.max && (this.nextButton.classList.contains("active") && this.nextButton.classList.remove("active"),
            this.nextButton.classList.contains("cf-gradient") && this.nextButton.classList.remove("cf-gradient"));
            var o = this.x;
            t.Helpers.setTransform(this.listToScroll, "translateX(" + o + "px)"),
            (this.interacting || Math.abs(this.x - this.xTarget) > .02 && !this.interacting) && (this.rAF = window.requestAnimationFrame(function() {
                return n.render()
            }))
        }
        ,
        e.prototype.setScroll = function(t, e) {
            this.xTarget = this.visibleAreaWidth == this.listWidth ? 0 : t,
            this.render()
        }
        ,
        e.prototype.pushDirection = function(t) {
            this.inputAccerlationTarget += 5e3 * t,
            this.render()
        }
        ,
        e.prototype.dealloc = function() {
            this.prevButton.removeEventListener("click", this.onListNavButtonsClickCallback, !1),
            this.nextButton.removeEventListener("click", this.onListNavButtonsClickCallback, !1),
            this.onListNavButtonsClickCallback = null,
            this.prevButton = null,
            this.nextButton = null,
            document.removeEventListener("mouseleave", this.documentLeaveCallback, !1),
            document.removeEventListener(t.Helpers.getMouseEvent("mouseup"), this.documentLeaveCallback, !1),
            this.interactionListener.removeEventListener(t.Helpers.getMouseEvent("mousedown"), this.onInteractStartCallback, !1),
            this.interactionListener.removeEventListener(t.Helpers.getMouseEvent("mouseup"), this.onInteractEndCallback, !1),
            this.interactionListener.removeEventListener(t.Helpers.getMouseEvent("mousemove"), this.onInteractMoveCallback, !1),
            this.documentLeaveCallback = null,
            this.onInteractStartCallback = null,
            this.onInteractEndCallback = null,
            this.onInteractMoveCallback = null
        }
        ,
        e.prototype.reset = function() {
            this.interacting = !1,
            this.startX = 0,
            this.startXTarget = this.startX,
            this.inputAccerlation = 0,
            this.x = 0,
            this.xTarget = 0,
            t.Helpers.setTransform(this.listToScroll, "translateX(0px)"),
            this.render(),
            this.prevButton.classList.remove("active"),
            this.nextButton.classList.remove("active")
        }
        ,
        e.prototype.resize = function(t, e) {
            this.reset(),
            this.visibleAreaWidth = e,
            this.listWidth = Math.max(e, t),
            this.max = -1 * (this.listWidth - this.visibleAreaWidth),
            this.render()
        }
        ,
        e
    }();
    e.accerlation = .1,
    t.ScrollController = e
}(cf || (cf = {}));
var cf;
!function(t) {
    var e = function() {
        function t(e) {
            this.data = {
                "user-image": "//conversational-form-static-0iznjsw.stackpathdns.com/src/images/human.png",
                "entry-not-found": "Dictionary item not found.",
                "input-placeholder": "Type your answer here ...",
                "group-placeholder": "Type to filter list ...",
                "input-placeholder-error": "Your input is not correct ...",
                "input-placeholder-required": "Input is required ...",
                "input-placeholder-file-error": "File upload failed ...",
                "input-placeholder-file-size-error": "File size too big ...",
                "input-no-filter": "No results found for <strong>{input-value}</strong>",
                "user-reponse-and": " and ",
                "user-reponse-missing": "Missing input ...",
                "user-reponse-missing-group": "Nothing selected ...",
                general: "General type1|General type2",
                "icon-type-file": "<svg class='cf-icon-file' viewBox='0 0 10 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'><g stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'><g transform='translate(-756.000000, -549.000000)' fill='#0D83FF'><g transform='translate(736.000000, 127.000000)'><g transform='translate(0.000000, 406.000000)'><polygon points='20 16 26.0030799 16 30 19.99994 30 30 20 30'></polygon></g></g></g></g></svg>"
            },
            this.robotData = {
                "robot-image": "//conversational-form-static-0iznjsw.stackpathdns.com/src/images/robot.png",
                input: "Please write some text.",
                text: "Please write some text.",
                checkbox: "Select as many as you want.",
                name: "What's your name?",
                email: "Need your e-mail.",
                password: "Please provide password",
                tel: "What's your phone number?",
                radio: "I need you to select one of these.",
                select: "Choose any of these options.",
                general: "General1|General2|General3.."
            },
            t.instance = this,
            e && e.data && (this.data = this.validateAndSetNewData(e.data, this.data)),
            e.userImage && (this.data["user-image"] = e.userImage),
            e.robotImage && (this.robotData["robot-image"] = e.robotImage),
            e && e.robotData && (this.robotData = this.validateAndSetNewData(e.robotData, this.robotData))
        }
        return t.get = function(e) {
            var n = t.instance
              , i = n.data[e];
            if (i) {
                var s = i.split("|");
                i = s[Math.floor(Math.random() * s.length)]
            } else
                i = n.data["entry-not-found"];
            return i
        }
        ,
        t.set = function(e, n, i) {
            var s = t.instance
              , o = "robot" == n ? s.robotData : s.data;
            return o[e] = i,
            o[e]
        }
        ,
        t.getRobotResponse = function(e) {
            var n = t.instance
              , i = n.robotData[e];
            if (i) {
                var s = i.split("|");
                i = s[Math.floor(Math.random() * s.length)]
            } else {
                var o = n.robotData.general.split("|");
                i = o[Math.floor(Math.random() * o.length)]
            }
            return i
        }
        ,
        t.parseAndGetMultiValueString = function(e) {
            for (var n = "", i = 0; i < e.length; i++) {
                var s = e[i]
                  , o = e.length > 1 && i == e.length - 2 ? t.get("user-reponse-and") : ", ";
                n += s + (i < e.length - 1 ? o : "")
            }
            return n
        }
        ,
        t.prototype.validateAndSetNewData = function(t, e) {
            for (var n in e)
                t[n] || (console.warn("Conversational Form Dictionary warning, '" + n + "' value is undefined, mapping '" + n + "' to default value. See Dictionary.ts for keys."),
                t[n] = e[n]);
            return t
        }
        ,
        t
    }();
    e.keyCodes = {
        left: 37,
        right: 39,
        down: 40,
        up: 38,
        backspace: 8,
        enter: 13,
        space: 32,
        shift: 16,
        tab: 9
    },
    t.Dictionary = e
}(cf || (cf = {}));
var cf;
!function(cf) {
    cf.TagEvents = {
        ORIGINAL_ELEMENT_CHANGED: "cf-tag-dom-element-changed"
    };
    var Tag = function() {
        function Tag(options) {
            this.domElement = options.domElement,
            this.changeCallback = this.onDomElementChange.bind(this),
            this.domElement.addEventListener("change", this.changeCallback, !1),
            this.domElement.tabIndex = -1,
            options.questions && (this.questions = options.questions),
            this.domElement.getAttribute("cf-validation") && (this.validationCallback = eval(this.domElement.getAttribute("cf-validation"))),
            this.domElement.getAttribute("pattern") && (this.pattern = new RegExp(this.domElement.getAttribute("pattern"))),
            "group" != this.type && cf.ConversationalForm.illustrateAppFlow && console.log("Conversational Form > Tag registered:", this.type, this),
            this.refresh()
        }
        return Object.defineProperty(Tag.prototype, "type", {
            get: function() {
                return this.domElement.getAttribute("type") || this.domElement.tagName.toLowerCase()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "name", {
            get: function() {
                return this.domElement.getAttribute("name")
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "id", {
            get: function() {
                return this.domElement.getAttribute("id")
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "inputPlaceholder", {
            get: function() {
                return this._inputPlaceholder
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "formless", {
            get: function() {
                return cf.TagsParser.isElementFormless(this.domElement)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "label", {
            get: function() {
                return this.getLabel()
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "value", {
            get: function() {
                return this.domElement.value
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "hasImage", {
            get: function() {
                return this.domElement.hasAttribute("cf-image")
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "disabled", {
            get: function() {
                return void 0 != this.domElement.getAttribute("disabled") && null != this.domElement.getAttribute("disabled")
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "required", {
            get: function() {
                return !!this.domElement.getAttribute("required") || "" == this.domElement.getAttribute("required")
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "question", {
            get: function() {
                return this.questions && 0 != this.questions.length ? this.questions[Math.floor(Math.random() * this.questions.length)] : cf.Dictionary.getRobotResponse(this.type)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "eventTarget", {
            set: function(t) {
                this._eventTarget = t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(Tag.prototype, "errorMessage", {
            get: function() {
                return this.errorMessages || (this.domElement.getAttribute("cf-error") ? this.errorMessages = this.domElement.getAttribute("cf-error").split("|") : this.domElement.parentNode && this.domElement.parentNode.getAttribute("cf-error") ? this.errorMessages = this.domElement.parentNode.getAttribute("cf-error").split("|") : this.required ? this.errorMessages = [cf.Dictionary.get("input-placeholder-required")] : "file" == this.type ? this.errorMessages = [cf.Dictionary.get("input-placeholder-file-error")] : this.errorMessages = [cf.Dictionary.get("input-placeholder-error")]),
                this.errorMessages[Math.floor(Math.random() * this.errorMessages.length)]
            },
            enumerable: !0,
            configurable: !0
        }),
        Tag.prototype.dealloc = function() {
            this.domElement.removeEventListener("change", this.changeCallback, !1),
            this.changeCallback = null,
            this.domElement = null,
            this.defaultValue = null,
            this.errorMessages = null,
            this.pattern = null,
            this._label = null,
            this.validationCallback = null,
            this.questions = null
        }
        ,
        Tag.isTagValid = function(t) {
            if ("hidden" === t.getAttribute("type"))
                return !1;
            if ("submit" === t.getAttribute("type"))
                return !1;
            if ("button" == t.getAttribute("type"))
                return !1;
            if ("none" === t.style.display)
                return !1;
            if ("hidden" === t.style.visibility)
                return !1;
            var e = cf.TagsParser.isElementFormless(t)
              , n = cf.Helpers.getInnerTextOfElement(t);
            return !("option" == t.tagName.toLowerCase() && (!e && "" == n || " " == n)) && ("select" == t.tagName.toLowerCase() || "option" == t.tagName.toLowerCase() || (!!e || !!(t.offsetWidth || t.offsetHeight || t.getClientRects().length)))
        }
        ,
        Tag.createTag = function(t) {
            if (Tag.isTagValid(t)) {
                var e = void 0;
                return "input" == t.tagName.toLowerCase() ? e = new cf.InputTag({
                    domElement: t
                }) : "textarea" == t.tagName.toLowerCase() ? e = new cf.InputTag({
                    domElement: t
                }) : "select" == t.tagName.toLowerCase() ? e = new cf.SelectTag({
                    domElement: t
                }) : "button" == t.tagName.toLowerCase() ? e = new cf.ButtonTag({
                    domElement: t
                }) : "option" == t.tagName.toLowerCase() && (e = new cf.OptionTag({
                    domElement: t
                })),
                e
            }
            return null
        }
        ,
        Tag.prototype.refresh = function() {
            this.defaultValue = this.domElement.value,
            this.questions = null,
            this.findAndSetQuestions()
        }
        ,
        Tag.prototype.setTagValueAndIsValid = function(t) {
            var e = !0
              , n = t.text;
            this.pattern && (e = this.pattern.test(n)),
            "" == n && this.required && (e = !1);
            var i = parseInt(this.domElement.getAttribute("min"), 10) || -1
              , s = parseInt(this.domElement.getAttribute("max"), 10) || -1;
            return -1 != i && n.length < i && (e = !1),
            -1 != s && n.length > s && (e = !1),
            e && "file" != this.type && (this.domElement.value = n),
            e
        }
        ,
        Tag.prototype.getLabel = function() {
            return this._label || this.findAndSetLabel(),
            this._label ? this._label : cf.Dictionary.getRobotResponse(this.type)
        }
        ,
        Tag.prototype.findAndSetQuestions = function() {
            if (!this.questions) {
                if (this.domElement.getAttribute("cf-questions"))
                    this.questions = this.domElement.getAttribute("cf-questions").split("|"),
                    this.domElement.getAttribute("cf-input-placeholder") && (this._inputPlaceholder = this.domElement.getAttribute("cf-input-placeholder"));
                else if (this.domElement.parentNode && this.domElement.parentNode.getAttribute("cf-questions")) {
                    var t = this.domElement.parentNode;
                    this.questions = t.getAttribute("cf-questions").split("|"),
                    t.getAttribute("cf-input-placeholder") && (this._inputPlaceholder = t.getAttribute("cf-input-placeholder"))
                } else {
                    var e = this.domElement.getAttribute("id")
                      , n = document.querySelector("label[for='" + e + "']");
                    n && (this.questions = [cf.Helpers.getInnerTextOfElement(n)])
                }
                !this.questions && this.domElement.getAttribute("placeholder") && (this.questions = [this.domElement.getAttribute("placeholder")])
            }
        }
        ,
        Tag.prototype.findAndSetLabel = function() {
            if (this.domElement.getAttribute("cf-label"))
                this._label = this.domElement.getAttribute("cf-label");
            else {
                var t = this.domElement.parentNode;
                if (t) {
                    var e = t.getElementsByTagName("label");
                    if (0 == e.length) {
                        var n = cf.Helpers.getInnerTextOfElement(t);
                        n && n.length > 0 && (e = [t])
                    } else if (e.length > 0)
                        for (var i = 0; i < e.length; i++) {
                            var s = e[i];
                            s.getAttribute("for") == this.id && (this._label = cf.Helpers.getInnerTextOfElement(s))
                        }
                    !this._label && e[0] && (this._label = cf.Helpers.getInnerTextOfElement(e[0]))
                }
            }
        }
        ,
        Tag.prototype.onDomElementChange = function() {
            this._eventTarget.dispatchEvent(new CustomEvent(cf.TagEvents.ORIGINAL_ELEMENT_CHANGED,{
                detail: {
                    value: this.value,
                    tag: this
                }
            }))
        }
        ,
        Tag
    }();
    cf.Tag = Tag
}(cf || (cf = {}));
var cf;
!function(t) {
    var e = function() {
        function e(e) {
            this.elements = e.elements,
            t.ConversationalForm.illustrateAppFlow && console.log("Conversational Form > TagGroup registered:", this.elements[0].type, this)
        }
        return Object.defineProperty(e.prototype, "required", {
            get: function() {
                for (var t = 0; t < this.elements.length; t++) {
                    var e = this.elements[t];
                    if (this.elements[t].required)
                        return !0
                }
                return !1
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "eventTarget", {
            set: function(t) {
                this._eventTarget = t;
                for (var e = 0; e < this.elements.length; e++) {
                    this.elements[e].eventTarget = t
                }
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "type", {
            get: function() {
                return "group"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "label", {
            get: function() {
                return ""
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "name", {
            get: function() {
                return this.elements[0].name
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "id", {
            get: function() {
                return "tag-group"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "question", {
            get: function() {
                var e = this.elements[0].question;
                return e || t.Dictionary.getRobotResponse(this.getGroupTagType())
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "activeElements", {
            get: function() {
                return this._activeElements
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "value", {
            get: function() {
                return this._values
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "disabled", {
            get: function() {
                for (var t = !1, e = 0; e < this.elements.length; e++) {
                    this.elements[e].disabled && (t = !0)
                }
                return t
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "errorMessage", {
            get: function() {
                for (var e = t.Dictionary.get("input-placeholder-error"), n = 0; n < this.elements.length; n++) {
                    e = this.elements[n].errorMessage
                }
                return e
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.dealloc = function() {
            for (var t = 0; t < this.elements.length; t++) {
                this.elements[t].dealloc()
            }
            this.elements = null
        }
        ,
        e.prototype.refresh = function() {
            for (var t = 0; t < this.elements.length; t++) {
                this.elements[t].refresh()
            }
        }
        ,
        e.prototype.getGroupTagType = function() {
            return this.elements[0].type
        }
        ,
        e.prototype.setTagValueAndIsValid = function(t) {
            var e = !1
              , n = this.elements[0].type;
            switch (this._values = [],
            this._activeElements = [],
            n) {
            case "radio":
                for (var i = [], s = !1, o = 0; o < t.controlElements.length; o++) {
                    var a = t.controlElements[o]
                      , r = this.elements[this.elements.indexOf(a.referenceTag)];
                    a.visible && (i.push(a),
                    r == a.referenceTag ? (r.domElement.checked = a.checked,
                    a.checked && (this._values.push(r.value),
                    this._activeElements.push(r)),
                    !s && a.checked && (s = !0)) : r.domElement.checked = !1)
                }
                if (e || 1 != i.length)
                    !e && s && (e = s);
                else {
                    var a = i[0]
                      , r = this.elements[this.elements.indexOf(a.referenceTag)];
                    a.checked = !0,
                    r.domElement.checked = !0,
                    e = !0,
                    a.checked && (this._values.push(r.value),
                    this._activeElements.push(r))
                }
                break;
            case "checkbox":
                e = !0;
                for (var o = 0; o < t.controlElements.length; o++) {
                    var a = t.controlElements[o]
                      , r = this.elements[this.elements.indexOf(a.referenceTag)];
                    r.domElement.checked = a.checked,
                    a.checked && (this._values.push(r.value),
                    this._activeElements.push(r))
                }
                break
            }
            return e
        }
        ,
        e
    }();
    t.TagGroup = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    var e = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return "text" == n.type || "email" == n.type || "tel" == n.type || "checkbox" == n.type || "radio" == n.type || "password" == n.type || n.type,
            n
        }
        return __extends(e, t),
        e.prototype.findAndSetQuestions = function() {
            t.prototype.findAndSetQuestions.call(this)
        }
        ,
        e.prototype.findAndSetLabel = function() {
            t.prototype.findAndSetLabel.call(this),
            this._label
        }
        ,
        e.prototype.setTagValueAndIsValid = function(e) {
            return "checkbox" == this.type || t.prototype.setTagValueAndIsValid.call(this, e)
        }
        ,
        e.prototype.dealloc = function() {
            t.prototype.dealloc.call(this)
        }
        ,
        e
    }(t.Tag);
    t.InputTag = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    var e = function(e) {
        function n(n) {
            var i = e.call(this, n) || this;
            i.optionTags = [];
            for (var s = i.domElement.getElementsByTagName("option"), o = 0; o < s.length; o++) {
                var a = s[o]
                  , r = t.Tag.createTag(a);
                r ? i.optionTags.push(r) : console.warn(i.constructor.name, "option tag invalid:", r)
            }
            return i
        }
        return __extends(n, e),
        Object.defineProperty(n.prototype, "type", {
            get: function() {
                return "select"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "value", {
            get: function() {
                return this._values
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "multipleChoice", {
            get: function() {
                return this.domElement.hasAttribute("multiple")
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.setTagValueAndIsValid = function(t) {
            var e = !1
              , n = [];
            this._values = [];
            for (var i = 0; i < this.optionTags.length; i++)
                for (var s = this.optionTags[i], o = 0; o < t.controlElements.length; o++) {
                    var a = t.controlElements[o];
                    a.referenceTag == s && (s.selected = a.selected,
                    !e && s.selected && (e = !0),
                    s.selected && this._values.push(s.value),
                    a.visible && n.push(a))
                }
            if (!e && 1 == n.length) {
                var r = n[0]
                  , s = this.optionTags[this.optionTags.indexOf(r.referenceTag)];
                r.selected = !0,
                s.selected = !0,
                e = !0,
                s.selected && this._values.push(s.value)
            }
            return e
        }
        ,
        n
    }(t.Tag);
    t.SelectTag = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    var e = function(t) {
        function e(e) {
            var n = t.call(this, e) || this;
            return "submit" == n.domElement.getAttribute("type") || n.domElement.getAttribute("type"),
            n
        }
        return __extends(e, t),
        e
    }(t.Tag);
    t.ButtonTag = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    var e = function(e) {
        function n() {
            return null !== e && e.apply(this, arguments) || this
        }
        return __extends(n, e),
        Object.defineProperty(n.prototype, "type", {
            get: function() {
                return "option"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "label", {
            get: function() {
                return this.formless ? e.prototype.getLabel.call(this) : t.Helpers.getInnerTextOfElement(this.domElement)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "selected", {
            get: function() {
                return this.domElement.selected
            },
            set: function(t) {
                t ? this.domElement.setAttribute("selected", "selected") : this.domElement.removeAttribute("selected")
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.setTagValueAndIsValid = function(t) {
            var e = !0;
            return !0
        }
        ,
        n
    }(t.Tag);
    t.OptionTag = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    var e = function(e) {
        function n(t) {
            var n = e.call(this, t) || this;
            return n.clickCallback = n.onClick.bind(n),
            n.el.addEventListener("click", n.clickCallback, !1),
            n.mouseDownCallback = n.onMouseDown.bind(n),
            n.el.addEventListener("mousedown", n.mouseDownCallback, !1),
            n.checkForImage(),
            n
        }
        return __extends(n, e),
        Object.defineProperty(n.prototype, "type", {
            get: function() {
                return "Button"
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.hasImage = function() {
            return this.referenceTag.hasImage
        }
        ,
        n.prototype.checkForImage = function() {
            this.hasImage() && (this.el.classList.add("has-image"),
            this.imgEl = document.createElement("img"),
            this.imageLoadedCallback = this.onImageLoaded.bind(this),
            this.imgEl.classList.add("cf-image"),
            this.imgEl.addEventListener("load", this.imageLoadedCallback, !1),
            this.imgEl.src = this.referenceTag.domElement.getAttribute("cf-image"),
            this.el.insertBefore(this.imgEl, this.el.children[0]))
        }
        ,
        n.prototype.onImageLoaded = function() {
            this.imgEl.classList.add("loaded"),
            this.eventTarget.dispatchEvent(new CustomEvent(t.ControlElementEvents.ON_LOADED,{}))
        }
        ,
        n.prototype.onMouseDown = function(t) {
            t.preventDefault()
        }
        ,
        n.prototype.onClick = function(t) {
            this.onChoose()
        }
        ,
        n.prototype.dealloc = function() {
            this.el.removeEventListener("click", this.clickCallback, !1),
            this.clickCallback = null,
            this.imageLoadedCallback && (this.imgEl.removeEventListener("load", this.imageLoadedCallback, !1),
            this.imageLoadedCallback = null),
            this.el.removeEventListener("mousedown", this.mouseDownCallback, !1),
            this.mouseDownCallback = null,
            e.prototype.dealloc.call(this)
        }
        ,
        n.prototype.getTemplate = function() {
            return '<cf-button class="cf-button">\n\t\t\t\t' + this.referenceTag.label + "\n\t\t\t</cf-button>\n\t\t\t"
        }
        ,
        n
    }(t.ControlElement);
    t.Button = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "type", {
            get: function() {
                return "RadioButton"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "checked", {
            get: function() {
                return this.el.hasAttribute("checked") && "checked" == this.el.getAttribute("checked")
            },
            set: function(t) {
                t ? this.el.setAttribute("checked", "checked") : this.el.removeAttribute("checked")
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.onClick = function(e) {
            this.checked = !this.checked,
            t.prototype.onClick.call(this, e)
        }
        ,
        e.prototype.getTemplate = function() {
            return '<cf-radio-button class="cf-button" ' + (this.referenceTag.domElement.checked || this.referenceTag.domElement.hasAttribute("checked") ? "checked=checked" : "") + ">\n\t\t\t\t<div>\n\t\t\t\t\t<cf-radio></cf-radio>\n\t\t\t\t\t" + this.referenceTag.label + "\n\t\t\t\t</div>\n\t\t\t</cf-radio-button>\n\t\t\t"
        }
        ,
        e
    }(t.Button);
    t.RadioButton = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t),
        Object.defineProperty(e.prototype, "type", {
            get: function() {
                return "CheckboxButton"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(e.prototype, "checked", {
            get: function() {
                return "checked" == this.el.getAttribute("checked")
            },
            set: function(t) {
                t ? (this.el.setAttribute("checked", "checked"),
                this.referenceTag.domElement.setAttribute("checked", "checked")) : (this.el.removeAttribute("checked"),
                this.referenceTag.domElement.removeAttribute("checked"))
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.onClick = function(t) {
            this.checked = !this.checked
        }
        ,
        e.prototype.getTemplate = function() {
            var t = this.referenceTag.domElement.checked && this.referenceTag.domElement.hasAttribute("checked");
            return '<cf-button class="cf-button cf-checkbox-button ' + (0 == this.referenceTag.label.trim().length ? "no-text" : "") + '" checked=' + (t ? "checked" : "") + ">\n\t\t\t\t<div>\n\t\t\t\t\t<cf-checkbox></cf-checkbox>\n\t\t\t\t\t" + this.referenceTag.label + "\n\t\t\t\t</div>\n\t\t\t</cf-button>\n\t\t\t"
        }
        ,
        e
    }(t.Button);
    t.CheckboxButton = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    t.OptionButtonEvents = {
        CLICK: "cf-option-button-click"
    };
    var e = function(e) {
        function n() {
            var t = null !== e && e.apply(this, arguments) || this;
            return t.isMultiChoice = !1,
            t
        }
        return __extends(n, e),
        Object.defineProperty(n.prototype, "type", {
            get: function() {
                return "OptionButton"
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "selected", {
            get: function() {
                return this.el.hasAttribute("selected")
            },
            set: function(t) {
                t ? this.el.setAttribute("selected", "selected") : this.el.removeAttribute("selected")
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.setData = function(t) {
            this.isMultiChoice = t.isMultiChoice,
            e.prototype.setData.call(this, t)
        }
        ,
        n.prototype.onClick = function(e) {
            t.ConversationalForm.illustrateFlow(this, "dispatch", t.OptionButtonEvents.CLICK, this),
            this.eventTarget.dispatchEvent(new CustomEvent(t.OptionButtonEvents.CLICK,{
                detail: this
            }))
        }
        ,
        n.prototype.getTemplate = function() {
            var t = '<cf-button class="cf-button ' + (this.isMultiChoice ? "cf-checkbox-button" : "") + '" ' + (this.referenceTag.domElement.selected ? "selected='selected'" : "") + ">";
            return t += "<div>",
            this.isMultiChoice && (t += "<cf-checkbox></cf-checkbox>"),
            t += this.referenceTag.label,
            t += "</div>",
            t += "</cf-button>"
        }
        ,
        n
    }(t.Button);
    t.OptionButton = e
}(cf || (cf = {}));
var cf;
!function(t) {
    var e = function() {
        function e(e) {
            this.context = e.context,
            this.eventTarget = e.eventTarget,
            this.referenceTag = e.referenceTag,
            this.multiChoice = this.referenceTag.domElement.hasAttribute("multiple"),
            this.onOptionButtonClickCallback = this.onOptionButtonClick.bind(this),
            this.eventTarget.addEventListener(t.OptionButtonEvents.CLICK, this.onOptionButtonClickCallback, !1),
            this.createElements()
        }
        return Object.defineProperty(e.prototype, "type", {
            get: function() {
                return "OptionsList"
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.getValue = function() {
            for (var t = [], e = 0; e < this.elements.length; e++) {
                var n = this.elements[e];
                if (!this.multiChoice && n.selected)
                    return t.push(n),
                    t;
                this.multiChoice && n.selected && t.push(n)
            }
            return t
        }
        ,
        e.prototype.onOptionButtonClick = function(e) {
            if (this.multiChoice)
                e.detail.selected = !e.detail.selected;
            else {
                for (var n = 0; n < this.elements.length; n++) {
                    var i = this.elements[n];
                    i != e.detail ? i.selected = !1 : i.selected = !0
                }
                t.ConversationalForm.illustrateFlow(this, "dispatch", t.ControlElementEvents.SUBMIT_VALUE, this.referenceTag),
                this.eventTarget.dispatchEvent(new CustomEvent(t.ControlElementEvents.SUBMIT_VALUE,{
                    detail: e.detail
                }))
            }
        }
        ,
        e.prototype.createElements = function() {
            this.elements = [];
            for (var e = this.referenceTag.optionTags, n = 0; n < e.length; n++) {
                var i = e[n]
                  , s = new t.OptionButton({
                    referenceTag: i,
                    isMultiChoice: this.referenceTag.multipleChoice,
                    eventTarget: this.eventTarget
                });
                this.elements.push(s),
                this.context.appendChild(s.el)
            }
        }
        ,
        e.prototype.dealloc = function() {
            for (this.eventTarget.removeEventListener(t.OptionButtonEvents.CLICK, this.onOptionButtonClickCallback, !1),
            this.onOptionButtonClickCallback = null; this.elements.length > 0; )
                this.elements.pop().dealloc();
            this.elements = null
        }
        ,
        e
    }();
    t.OptionsList = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    var e = function(e) {
        function n(n) {
            var i = e.call(this, n) || this;
            if (i.maxFileSize = 1e11,
            i.loading = !1,
            i.submitTimer = 0,
            i._fileName = "",
            i._readerResult = "",
            !t.Helpers.caniuse.fileReader())
                throw new Error("Conversational Form Error: No FileReader available for client.");
            var s = i.referenceTag.domElement.getAttribute("cf-max-size") || i.referenceTag.domElement.getAttribute("max-size");
            if (s) {
                var o = parseInt(s, 10);
                i.maxFileSize = o
            }
            return i.progressBar = i.el.getElementsByTagName("cf-upload-file-progress-bar")[0],
            i.onDomElementChangeCallback = i.onDomElementChange.bind(i),
            i.referenceTag.domElement.addEventListener("change", i.onDomElementChangeCallback, !1),
            i
        }
        return __extends(n, e),
        Object.defineProperty(n.prototype, "value", {
            get: function() {
                return this.referenceTag.domElement.value
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "readerResult", {
            get: function() {
                return this._readerResult
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "files", {
            get: function() {
                return this._files
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "fileName", {
            get: function() {
                return this._fileName
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "type", {
            get: function() {
                return "UploadFileUI"
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.getFilesAsString = function() {
            var e = document.createElement("span");
            return e.innerHTML = t.Dictionary.get("icon-type-file") + this.fileName,
            e.outerHTML
        }
        ,
        n.prototype.onDomElementChange = function(e) {
            var n = this;
            console.log("...onDomElementChange");
            var i = new FileReader;
            this._files = this.referenceTag.domElement.files,
            i.onerror = function(t) {
                console.log("onerror", t)
            }
            ,
            i.onprogress = function(t) {
                console.log("onprogress", t),
                n.progressBar.style.width = t.loaded / t.total * 100 + "%"
            }
            ,
            i.onabort = function(t) {
                console.log("onabort", t)
            }
            ,
            i.onloadstart = function(e) {
                var s = n.files[0]
                  , o = s ? s.size : n.maxFileSize + 1;
                if (o > n.maxFileSize) {
                    i.abort();
                    var a = {
                        errorText: t.Dictionary.get("input-placeholder-file-size-error")
                    };
                    t.ConversationalForm.illustrateFlow(n, "dispatch", t.FlowEvents.USER_INPUT_INVALID, a),
                    n.eventTarget.dispatchEvent(new CustomEvent(t.FlowEvents.USER_INPUT_INVALID,{
                        detail: a
                    }))
                } else {
                    n._fileName = s.name,
                    n.loading = !0,
                    n.animateIn();
                    var r = Math.floor(Math.log(o) / Math.log(1024))
                      , l = ["b", "kb", "mb", "gb"];
                    r = Math.min(l.length - 1, r);
                    var u = 1 * Number((o / Math.pow(1024, r)).toFixed(2)) + " " + l[r]
                      , c = s.name + " (" + u + ")";
                    n.el.getElementsByTagName("cf-upload-file-text")[0].innerHTML = c,
                    n.eventTarget.dispatchEvent(new CustomEvent(t.ControlElementEvents.PROGRESS_CHANGE,{
                        detail: t.ControlElementProgressStates.BUSY
                    }))
                }
            }
            ,
            i.onload = function(e) {
                n._readerResult = e.target.result,
                n.progressBar.classList.add("loaded"),
                n.submitTimer = setTimeout(function() {
                    n.el.classList.remove("animate-in"),
                    n.onChoose(),
                    n.eventTarget.dispatchEvent(new CustomEvent(t.ControlElementEvents.PROGRESS_CHANGE,{
                        detail: t.ControlElementProgressStates.READY
                    }))
                }, 0)
            }
            ,
            i.readAsDataURL(this.files[0])
        }
        ,
        n.prototype.animateIn = function() {
            this.loading && e.prototype.animateIn.call(this)
        }
        ,
        n.prototype.onClick = function(t) {}
        ,
        n.prototype.triggerFileSelect = function() {
            this.referenceTag.domElement.click()
        }
        ,
        n.prototype.dealloc = function() {
            clearTimeout(this.submitTimer),
            this.progressBar = null,
            this.onDomElementChangeCallback && (this.referenceTag.domElement.removeEventListener("change", this.onDomElementChangeCallback, !1),
            this.onDomElementChangeCallback = null),
            e.prototype.dealloc.call(this)
        }
        ,
        n.prototype.getTemplate = function() {
            var t = "1" == this.referenceTag.value || this.referenceTag.domElement.hasAttribute("checked");
            return "<cf-upload-file-ui>\n\t\t\t\t<cf-upload-file-text></cf-upload-file-text>\n\t\t\t\t<cf-upload-file-progress>\n\t\t\t\t\t<cf-upload-file-progress-bar></cf-upload-file-progress-bar>\n\t\t\t\t</cf-upload-file-progress>\n\t\t\t</cf-upload-file-ui>\n\t\t\t"
        }
        ,
        n
    }(t.Button);
    t.UploadFileUI = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function() {
    var t = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(t, e) {
        t.__proto__ = e
    }
    || function(t, e) {
        for (var n in e)
            e.hasOwnProperty(n) && (t[n] = e[n])
    }
    ;
    return function(e, n) {
        function i() {
            this.constructor = e
        }
        t(e, n),
        e.prototype = null === n ? Object.create(n) : (i.prototype = n.prototype,
        new i)
    }
}(), cf;
!function(t) {
    t.UserInputEvents = {
        SUBMIT: "cf-input-user-input-submit",
        KEY_CHANGE: "cf-input-key-change",
        CONTROL_ELEMENTS_ADDED: "cf-input-control-elements-added",
        HEIGHT_CHANGE: "cf-input-height-change",
        FOCUS: "cf-input-focus",
        BLUR: "cf-input-blur"
    };
    var e = function(e) {
        function n(n) {
            var i = e.call(this, n) || this;
            return i.errorTimer = 0,
            i.initialInputHeight = 0,
            i.shiftIsDown = !1,
            i._disabled = !1,
            i._active = !1,
            i.cfReference = n.cfReference,
            i.eventTarget = n.eventTarget,
            i.inputElement = i.el.getElementsByTagName("textarea")[0],
            i.onInputFocusCallback = i.onInputFocus.bind(i),
            i.onInputBlurCallback = i.onInputBlur.bind(i),
            i.inputElement.addEventListener("focus", i.onInputFocusCallback, !1),
            i.inputElement.addEventListener("blur", i.onInputBlurCallback, !1),
            i.controlElements = new t.ControlElements({
                el: i.el.getElementsByTagName("cf-input-control-elements")[0],
                infoEl: i.el.getElementsByTagName("cf-info")[0],
                eventTarget: i.eventTarget
            }),
            i.windowFocusCallback = i.windowFocus.bind(i),
            window.addEventListener("focus", i.windowFocusCallback, !1),
            i.keyUpCallback = i.onKeyUp.bind(i),
            document.addEventListener("keyup", i.keyUpCallback, !1),
            i.keyDownCallback = i.onKeyDown.bind(i),
            document.addEventListener("keydown", i.keyDownCallback, !1),
            i.flowUpdateCallback = i.onFlowUpdate.bind(i),
            i.eventTarget.addEventListener(t.FlowEvents.FLOW_UPDATE, i.flowUpdateCallback, !1),
            i.onOriginalTagChangedCallback = i.onOriginalTagChanged.bind(i),
            i.eventTarget.addEventListener(t.TagEvents.ORIGINAL_ELEMENT_CHANGED, i.onOriginalTagChangedCallback, !1),
            i.inputInvalidCallback = i.inputInvalid.bind(i),
            i.eventTarget.addEventListener(t.FlowEvents.USER_INPUT_INVALID, i.inputInvalidCallback, !1),
            i.onControlElementSubmitCallback = i.onControlElementSubmit.bind(i),
            i.eventTarget.addEventListener(t.ControlElementEvents.SUBMIT_VALUE, i.onControlElementSubmitCallback, !1),
            i.onControlElementProgressChangeCallback = i.onControlElementProgressChange.bind(i),
            i.eventTarget.addEventListener(t.ControlElementEvents.PROGRESS_CHANGE, i.onControlElementProgressChangeCallback, !1),
            i.submitButton = i.el.getElementsByTagName("cf-input-button")[0],
            i.onSubmitButtonClickCallback = i.onSubmitButtonClick.bind(i),
            i.submitButton.addEventListener("click", i.onSubmitButtonClickCallback, !1),
            i
        }
        return __extends(n, e),
        Object.defineProperty(n.prototype, "active", {
            get: function() {
                return this.inputElement === document.activeElement || this._active
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "visible", {
            set: function(t) {
                !this.el.classList.contains("animate-in") && t ? this.el.classList.add("animate-in") : this.el.classList.contains("animate-in") && !t && this.el.classList.remove("animate-in")
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "currentTag", {
            get: function() {
                return this._currentTag
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "disabled", {
            set: function(t) {
                this._disabled != t && (this._disabled = t,
                t ? (this.el.setAttribute("disabled", "disabled"),
                this.inputElement.blur()) : (this.setFocusOnInput(),
                this.el.removeAttribute("disabled")))
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.getInputValue = function() {
            var t = this.inputElement.value
              , e = document.createElement("div");
            return e.appendChild(document.createTextNode(t)),
            e.innerHTML
        }
        ,
        n.prototype.getFlowDTO = function() {
            var t;
            return t = this.controlElements && this.controlElements.active ? this.controlElements.getDTO() : {
                text: this.getInputValue()
            },
            t.tag || (t.tag = this.currentTag),
            t.input = this,
            t
        }
        ,
        n.prototype.reset = function() {
            this.controlElements && this.controlElements.clearTagsAndReset()
        }
        ,
        n.prototype.onFlowStopped = function() {
            this.controlElements && this.controlElements.clearTagsAndReset(),
            this.disabled = !0
        }
        ,
        n.prototype.onOriginalTagChanged = function(t) {
            this.currentTag == t.detail.tag && this.onInputChange(),
            this.controlElements && this.controlElements.active && this.controlElements.updateStateOnElementsFromTag(t.detail.tag)
        }
        ,
        n.prototype.onInputChange = function() {
            if (this.active || this.controlElements.active) {
                var e = Math.max(this.initialInputHeight, parseInt(this.inputElement.style.height, 10));
                this.inputElement.style.height = "0px",
                this.inputElement.style.height = (0 === this.inputElement.scrollHeight ? e : this.inputElement.scrollHeight) + "px",
                t.ConversationalForm.illustrateFlow(this, "dispatch", t.UserInputEvents.HEIGHT_CHANGE),
                this.eventTarget.dispatchEvent(new CustomEvent(t.UserInputEvents.HEIGHT_CHANGE,{
                    detail: this.inputElement.scrollHeight
                }))
            }
        }
        ,
        n.prototype.inputInvalid = function(e) {
            var i = this;
            t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail);
            var s = e.detail;
            this.inputElement.setAttribute("data-value", this.inputElement.value),
            this.inputElement.value = "",
            this.el.setAttribute("error", ""),
            this.disabled = !0,
            this.inputElement.setAttribute("placeholder", s.errorText || this._currentTag.errorMessage),
            clearTimeout(this.errorTimer),
            this.errorTimer = setTimeout(function() {
                i.disabled = !1,
                i.el.removeAttribute("error"),
                i.inputElement.value = i.inputElement.getAttribute("data-value"),
                i.inputElement.setAttribute("data-value", ""),
                i.setPlaceholder(),
                i.setFocusOnInput(),
                i.controlElements && i.controlElements.resetAfterErrorMessage()
            }, n.ERROR_TIME)
        }
        ,
        n.prototype.setPlaceholder = function() {
            this._currentTag ? this._currentTag.inputPlaceholder ? this.inputElement.setAttribute("placeholder", this._currentTag.inputPlaceholder) : this.inputElement.setAttribute("placeholder", "group" == this._currentTag.type ? t.Dictionary.get("group-placeholder") : t.Dictionary.get("input-placeholder")) : this.inputElement.setAttribute("placeholder", t.Dictionary.get("group-placeholder"))
        }
        ,
        n.prototype.checkForCorrectInputTag = function() {
            var t = this.inputElement.getAttribute("type")
              , e = "password" == this._currentTag.type && "password" != t
              , n = "password" != this._currentTag.type && "password" == t;
            if (this.inputElement && (e || n) && (this.inputElement.removeEventListener("focus", this.onInputFocusCallback, !1),
            this.inputElement.removeEventListener("blur", this.onInputBlurCallback, !1)),
            e) {
                var i = document.createElement("input");
                Array.prototype.slice.call(this.inputElement.attributes).forEach(function(t) {
                    i.setAttribute(t.name, t.value)
                }),
                i.setAttribute("autocomplete", "new-password"),
                this.inputElement.parentNode.replaceChild(i, this.inputElement),
                this.inputElement = i
            } else if (n) {
                var s = document.createElement("textarea");
                Array.prototype.slice.call(this.inputElement.attributes).forEach(function(t) {
                    s.setAttribute(t.name, t.value)
                }),
                this.inputElement.parentNode.replaceChild(s, this.inputElement),
                this.inputElement = s
            }
            this.inputElement && (e || n) && (this.inputElement.addEventListener("focus", this.onInputFocusCallback, !1),
            this.inputElement.addEventListener("blur", this.onInputBlurCallback, !1)),
            0 == this.initialInputHeight && (this.initialInputHeight = this.inputElement.offsetHeight),
            this.setFocusOnInput()
        }
        ,
        n.prototype.onFlowUpdate = function(e) {
            var n = this;
            t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail),
            this.visible = !0,
            this._currentTag = e.detail.tag,
            this.el.setAttribute("tag-type", this._currentTag.type),
            this.checkForCorrectInputTag(),
            this.inputElement.setAttribute("type", "password" == this._currentTag.type ? "password" : "input"),
            clearTimeout(this.errorTimer),
            this.el.removeAttribute("error"),
            this.inputElement.setAttribute("data-value", ""),
            this.inputElement.value = "",
            this.submitButton.classList.remove("loading"),
            this.setPlaceholder(),
            this.resetValue(),
            this.setFocusOnInput(),
            this.controlElements.reset(),
            "group" == this._currentTag.type ? this.buildControlElements(this._currentTag.elements) : this.buildControlElements([this._currentTag]),
            "text" != this._currentTag.type && "email" != this._currentTag.type || (this.inputElement.value = this._currentTag.defaultValue.toString()),
            setTimeout(function() {
                n.disabled = !1,
                n.onInputChange()
            }, 150)
        }
        ,
        n.prototype.onControlElementProgressChange = function(e) {
            var n = e.detail;
            this.disabled = n == t.ControlElementProgressStates.BUSY
        }
        ,
        n.prototype.buildControlElements = function(t) {
            this.controlElements.buildTags(t)
        }
        ,
        n.prototype.onControlElementSubmit = function(e) {
            t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail);
            var n = e.detail;
            this.controlElements.updateStateOnElements(n),
            this.doSubmit()
        }
        ,
        n.prototype.onSubmitButtonClick = function(t) {
            this.onEnterOrSubmitButtonSubmit(t)
        }
        ,
        n.prototype.isMetaKeyPressed = function(t) {
            t.metaKey || [91, 93].indexOf(t.keyCode)
        }
        ,
        n.prototype.onKeyDown = function(e) {
            (this.active || this.controlElements.focus) && (this.isMetaKeyPressed(e) || (e.keyCode == t.Dictionary.keyCodes.shift && (this.shiftIsDown = !0),
            e.keyCode != t.Dictionary.keyCodes.enter || e.shiftKey || e.preventDefault()))
        }
        ,
        n.prototype.onKeyUp = function(e) {
            if ((this.active || this.controlElements.focus) && !this.isMetaKeyPressed(e)) {
                if (e.keyCode == t.Dictionary.keyCodes.shift)
                    this.shiftIsDown = !1;
                else if (e.keyCode == t.Dictionary.keyCodes.up)
                    e.preventDefault(),
                    this.active && !this.controlElements.focus && this.controlElements.focusFrom("bottom");
                else if (e.keyCode == t.Dictionary.keyCodes.down)
                    e.preventDefault(),
                    this.active && !this.controlElements.focus && this.controlElements.focusFrom("top");
                else if (e.keyCode == t.Dictionary.keyCodes.tab) {
                    for (var n = !1, i = e.target.parentNode; null != i; ) {
                        if (i === this.cfReference.el) {
                            n = !0;
                            break
                        }
                        i = i.parentNode
                    }
                    n || (e.preventDefault(),
                    this.controlElements.active || this.setFocusOnInput())
                }
                if (!this.el.hasAttribute("disabled")) {
                    var s = this.getFlowDTO();
                    if (e.keyCode == t.Dictionary.keyCodes.enter && !e.shiftKey || e.keyCode == t.Dictionary.keyCodes.space)
                        if (e.keyCode == t.Dictionary.keyCodes.enter && this.active)
                            e.preventDefault(),
                            this.onEnterOrSubmitButtonSubmit();
                        else if (e.keyCode == t.Dictionary.keyCodes.enter || e.keyCode == t.Dictionary.keyCodes.space) {
                            e.preventDefault();
                            var o = "group" == this._currentTag.type ? this._currentTag.getGroupTagType() : this._currentTag.type;
                            if ("select" == o || "checkbox" == o) {
                                var a = this._currentTag;
                                "checkbox" == o || a.multipleChoice ? this.active && e.keyCode == t.Dictionary.keyCodes.enter ? this.submitButton.click() : (this.dispatchKeyChange(s, e.keyCode),
                                this.active || (this.resetValue(),
                                this.setFocusOnInput(),
                                this.dispatchKeyChange(s, e.keyCode))) : this.dispatchKeyChange(s, e.keyCode)
                            } else
                                "group" == this._currentTag.type && this.dispatchKeyChange(s, e.keyCode)
                        } else
                            e.keyCode == t.Dictionary.keyCodes.space && document.activeElement && this.dispatchKeyChange(s, e.keyCode);
                    else
                        e.keyCode != t.Dictionary.keyCodes.shift && e.keyCode != t.Dictionary.keyCodes.tab && this.dispatchKeyChange(s, e.keyCode);
                    this.onInputChange()
                }
            }
        }
        ,
        n.prototype.dispatchKeyChange = function(e, n) {
            t.ConversationalForm.illustrateFlow(this, "dispatch", t.UserInputEvents.KEY_CHANGE, e),
            this.eventTarget.dispatchEvent(new CustomEvent(t.UserInputEvents.KEY_CHANGE,{
                detail: {
                    dto: e,
                    keyCode: n,
                    inputFieldActive: this.active
                }
            }))
        }
        ,
        n.prototype.windowFocus = function(t) {
            this.setFocusOnInput()
        }
        ,
        n.prototype.onInputBlur = function(e) {
            this._active = !1,
            this.eventTarget.dispatchEvent(new CustomEvent(t.UserInputEvents.BLUR))
        }
        ,
        n.prototype.onInputFocus = function(e) {
            this._active = !0,
            this.onInputChange(),
            this.eventTarget.dispatchEvent(new CustomEvent(t.UserInputEvents.FOCUS))
        }
        ,
        n.prototype.setFocusOnInput = function() {
            n.preventAutoFocus || this.inputElement.focus()
        }
        ,
        n.prototype.onEnterOrSubmitButtonSubmit = function(t) {
            void 0 === t && (t = null),
            this.active && this.controlElements.highlighted ? this.controlElements.clickOnHighlighted() : this._currentTag ? "file" == this._currentTag.type && t ? this.controlElements.getElement(0).triggerFileSelect() : this.doSubmit() : this.eventTarget.cf.addUserChatResponse(this.inputElement.value)
        }
        ,
        n.prototype.doSubmit = function() {
            var e = this.getFlowDTO();
            this.submitButton.classList.add("loading"),
            this.disabled = !0,
            this.el.removeAttribute("error"),
            this.inputElement.setAttribute("data-value", ""),
            t.ConversationalForm.illustrateFlow(this, "dispatch", t.UserInputEvents.SUBMIT, e),
            this.eventTarget.dispatchEvent(new CustomEvent(t.UserInputEvents.SUBMIT,{
                detail: e
            }))
        }
        ,
        n.prototype.resetValue = function() {
            this.inputElement.value = "",
            this.onInputChange()
        }
        ,
        n.prototype.dealloc = function() {
            this.inputElement.removeEventListener("blur", this.onInputBlurCallback, !1),
            this.onInputBlurCallback = null,
            this.inputElement.removeEventListener("focus", this.onInputFocusCallback, !1),
            this.onInputFocusCallback = null,
            window.removeEventListener("focus", this.windowFocusCallback, !1),
            this.windowFocusCallback = null,
            document.removeEventListener("keydown", this.keyDownCallback, !1),
            this.keyDownCallback = null,
            document.removeEventListener("keyup", this.keyUpCallback, !1),
            this.keyUpCallback = null,
            this.eventTarget.removeEventListener(t.FlowEvents.FLOW_UPDATE, this.flowUpdateCallback, !1),
            this.flowUpdateCallback = null,
            this.eventTarget.removeEventListener(t.FlowEvents.USER_INPUT_INVALID, this.inputInvalidCallback, !1),
            this.inputInvalidCallback = null,
            this.eventTarget.removeEventListener(t.ControlElementEvents.SUBMIT_VALUE, this.onControlElementSubmitCallback, !1),
            this.onControlElementSubmitCallback = null,
            this.submitButton = this.el.getElementsByClassName("cf-input-button")[0],
            this.submitButton.removeEventListener("click", this.onSubmitButtonClickCallback, !1),
            this.onSubmitButtonClickCallback = null,
            e.prototype.dealloc.call(this)
        }
        ,
        n.prototype.getTemplate = function() {
            return '<cf-input>\n\t\t\t\t<cf-info></cf-info>\n\t\t\t\t<cf-input-control-elements>\n\t\t\t\t\t<cf-list-button direction="prev">\n\t\t\t\t\t</cf-list-button>\n\t\t\t\t\t<cf-list-button direction="next">\n\t\t\t\t\t</cf-list-button>\n\t\t\t\t\t<cf-list>\n\t\t\t\t\t</cf-list>\n\t\t\t\t</cf-input-control-elements>\n\n\t\t\t\t<cf-input-button class="cf-input-button">\n\t\t\t\t\t<div class="cf-icon-progress"></div>\n\t\t\t\t\t<div class="cf-icon-attachment"></div>\n\t\t\t\t</cf-input-button>\n\t\t\t\t\n\t\t\t\t<textarea type=\'input\' tabindex="1" rows="1"></textarea>\n\n\t\t\t</cf-input>\n\t\t\t'
        }
        ,
        n
    }(t.BasicElement);
    e.preventAutoFocus = !1,
    e.ERROR_TIME = 2e3,
    t.UserInput = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    t.ChatResponseEvents = {
        USER_ANSWER_CLICKED: "cf-on-user-answer-clicked"
    };
    var e = function(e) {
        function n(t) {
            var n = e.call(this, t) || this;
            return n._tag = t.tag,
            n.textEl = n.el.getElementsByTagName("text")[0],
            n
        }
        return __extends(n, e),
        Object.defineProperty(n.prototype, "tag", {
            get: function() {
                return this._tag
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "disabled", {
            get: function() {
                return this.el.classList.contains("disabled")
            },
            set: function(t) {
                this.el.classList.toggle("disabled", t)
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(n.prototype, "visible", {
            set: function(t) {
                t ? this.el.classList.add("show") : this.el.classList.remove("show")
            },
            enumerable: !0,
            configurable: !0
        }),
        n.prototype.setValue = function(e) {
            void 0 === e && (e = null),
            this.visible || (this.visible = !0);
            var n = this.textEl.hasAttribute("thinking");
            if (e) {
                this.response = e.text;
                var i = this.processResponseAndSetText();
                if (this.responseLink && !this.isRobotReponse && this.responseLink.processResponseAndSetText(),
                e && e.controlElements && e.controlElements[0])
                    switch (e.controlElements[0].type) {
                    case "UploadFileUI":
                        this.textEl.classList.add("file-icon");
                        break
                    }
                this.isRobotReponse || this.onClickCallback || (this.onClickCallback = this.onClick.bind(this),
                this.el.addEventListener(t.Helpers.getMouseEvent("click"), this.onClickCallback, !1))
            } else
                this.setToThinking()
        }
        ,
        n.prototype.hide = function() {
            this.el.classList.remove("show"),
            this.disabled = !0
        }
        ,
        n.prototype.show = function() {
            this.el.classList.add("show"),
            this.disabled = !1,
            this.response ? this.checkForEditMode() : this.setToThinking()
        }
        ,
        n.prototype.updateThumbnail = function(t) {
            this.image = t,
            this.el.getElementsByTagName("thumb")[0].style.backgroundImage = "url(" + this.image + ")"
        }
        ,
        n.prototype.setLinkToOtherReponse = function(t) {
            this.responseLink = t
        }
        ,
        n.prototype.processResponseAndSetText = function() {
            var e = this
              , n = this.response;
            if (this._tag && "password" == this._tag.type && !this.isRobotReponse) {
                for (var i = "", s = 0; s < n.length; s++)
                    i += "*";
                n = i
            } else
                n = t.Helpers.emojify(n);
            return this.responseLink && this.isRobotReponse && (n = n.split("{previous-answer}").join(this.responseLink.parsedResponse)),
            -1 != n.indexOf("contains-image") && this.textEl.classList.add("contains-image"),
            this.textEl.innerHTML = n,
            this.parsedResponse = n,
            this.textEl.removeAttribute("thinking"),
            this.textEl.removeAttribute("value-added"),
            setTimeout(function() {
                e.textEl.setAttribute("value-added", "")
            }, 0),
            this.checkForEditMode(),
            n
        }
        ,
        n.prototype.checkForEditMode = function() {
            this.isRobotReponse || this.textEl.hasAttribute("thinking") || (this.el.classList.add("can-edit"),
            this.disabled = !1)
        }
        ,
        n.prototype.setToThinking = function() {
            this.textEl.innerHTML = n.THINKING_MARKUP,
            this.el.classList.remove("can-edit"),
            this.textEl.setAttribute("thinking", "")
        }
        ,
        n.prototype.onClick = function(e) {
            this.setToThinking(),
            t.ConversationalForm.illustrateFlow(this, "dispatch", t.ChatResponseEvents.USER_ANSWER_CLICKED, e),
            this.eventTarget.dispatchEvent(new CustomEvent(t.ChatResponseEvents.USER_ANSWER_CLICKED,{
                detail: this._tag
            }))
        }
        ,
        n.prototype.setData = function(n) {
            var i = this;
            this.image = n.image,
            this.response = "",
            this.isRobotReponse = n.isRobotReponse,
            e.prototype.setData.call(this, n),
            setTimeout(function() {
                i.setValue(),
                i.isRobotReponse || null != n.response ? setTimeout(function() {
                    return i.setValue({
                        text: n.response
                    })
                }, 0) : setTimeout(function() {
                    return i.el.classList.add("peak-thumb")
                }, t.ConversationalForm.animationsEnabled ? 1400 : 0)
            }, 0)
        }
        ,
        n.prototype.dealloc = function() {
            this.onClickCallback && (this.el.removeEventListener(t.Helpers.getMouseEvent("click"), this.onClickCallback, !1),
            this.onClickCallback = null),
            e.prototype.dealloc.call(this)
        }
        ,
        n.prototype.getTemplate = function() {
            return '<cf-chat-response class="' + (this.isRobotReponse ? "robot" : "user") + '">\n\t\t\t\t<thumb style="background-image: url(' + this.image + ')"></thumb>\n\t\t\t\t<text>' + (this.response ? this.response : n.THINKING_MARKUP) + "</text>\n\t\t\t</cf-chat-response>"
        }
        ,
        n
    }(t.BasicElement);
    e.THINKING_MARKUP = "<thinking><span>.</span><span>.</span><span>.</span></thinking>",
    t.ChatResponse = e
}(cf || (cf = {}));
var __extends = this && this.__extends || function(t, e) {
    function n() {
        this.constructor = t
    }
    for (var i in e)
        e.hasOwnProperty(i) && (t[i] = e[i]);
    t.prototype = null === e ? Object.create(e) : (n.prototype = e.prototype,
    new n)
}
, cf;
!function(t) {
    t.ChatListEvents = {
        CHATLIST_UPDATED: "cf-chatlist-updated"
    };
    var e = function(e) {
        function n(n) {
            var i = e.call(this, n) || this;
            return i.responses = [],
            i.flowUpdateCallback = i.onFlowUpdate.bind(i),
            i.eventTarget.addEventListener(t.FlowEvents.FLOW_UPDATE, i.flowUpdateCallback, !1),
            i.userInputUpdateCallback = i.onUserInputUpdate.bind(i),
            i.eventTarget.addEventListener(t.FlowEvents.USER_INPUT_UPDATE, i.userInputUpdateCallback, !1),
            i.onInputKeyChangeCallback = i.onInputKeyChange.bind(i),
            i.eventTarget.addEventListener(t.UserInputEvents.KEY_CHANGE, i.onInputKeyChangeCallback, !1),
            i.onInputHeightChangeCallback = i.onInputHeightChange.bind(i),
            i.eventTarget.addEventListener(t.UserInputEvents.HEIGHT_CHANGE, i.onInputHeightChangeCallback, !1),
            i
        }
        return __extends(n, e),
        n.prototype.onInputHeightChange = function(e) {
            var n = e.detail.dto;
            t.ConversationalForm.illustrateFlow(this, "receive", e.type, n),
            this.scrollListTo()
        }
        ,
        n.prototype.onInputKeyChange = function(e) {
            var n = e.detail.dto;
            t.ConversationalForm.illustrateFlow(this, "receive", e.type, n)
        }
        ,
        n.prototype.onUserInputUpdate = function(e) {
            if (t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail),
            !this.currentUserResponse)
                throw new Error("No current response ..?");
            var n = e.detail;
            this.setCurrentUserResponse(n)
        }
        ,
        n.prototype.onFlowUpdate = function(e) {
            t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail);
            var n = e.detail.tag;
            if (this.currentResponse && (this.currentResponse.disabled = !1),
            this.containsTagResponse(n) && !e.detail.ignoreExistingTag)
                this.onUserWantsToEditTag(n);
            else {
                var i = this.createResponse(!0, n, n.question);
                this.currentUserResponse && (this.currentUserResponse.setLinkToOtherReponse(i),
                i.setLinkToOtherReponse(this.currentUserResponse)),
                this.currentUserResponse = this.createResponse(!1, n)
            }
        }
        ,
        n.prototype.containsTagResponse = function(t) {
            for (var e = 0; e < this.responses.length; e++) {
                var n = this.responses[e];
                if (!n.isRobotReponse && n.tag == t)
                    return !0
            }
            return !1
        }
        ,
        n.prototype.onUserWantsToEditTag = function(t) {
            for (var e, n = 0; n < this.responses.length; n++) {
                var i = this.responses[n];
                if (!i.isRobotReponse && i.tag == t) {
                    e = i;
                    break
                }
            }
            this.currentUserResponse.processResponseAndSetText(),
            e && (this.currentUserResponse == this.responses[this.responses.length - 1] && this.currentUserResponse.hide(),
            this.currentUserResponse = e,
            this.onListUpdate(this.currentUserResponse))
        }
        ,
        n.prototype.onListUpdate = function(e) {
            var n = this;
            setTimeout(function() {
                n.eventTarget.dispatchEvent(new CustomEvent(t.ChatListEvents.CHATLIST_UPDATED,{
                    detail: n
                })),
                e.show(),
                n.scrollListTo(e)
            }, 0)
        }
        ,
        n.prototype.setCurrentUserResponse = function(e) {
            this.flowDTOFromUserInputUpdate = e,
            !this.flowDTOFromUserInputUpdate.text && e.tag && ("group" == e.tag.type ? this.flowDTOFromUserInputUpdate.text = t.Dictionary.get("user-reponse-missing-group") : "password" != e.tag.type && (this.flowDTOFromUserInputUpdate.text = t.Dictionary.get("user-reponse-missing"))),
            this.currentUserResponse.setValue(this.flowDTOFromUserInputUpdate),
            this.scrollListTo()
        }
        ,
        n.prototype.updateThumbnail = function(e, n) {
            t.Dictionary.set(e ? "robot-image" : "user-image", e ? "robot" : "human", n);
            for (var i = e ? t.Dictionary.getRobotResponse("robot-image") : t.Dictionary.get("user-image"), s = 0; s < this.responses.length; s++) {
                var o = this.responses[s];
                e && o.isRobotReponse ? o.updateThumbnail(i) : e || o.isRobotReponse || o.updateThumbnail(i)
            }
        }
        ,
        n.prototype.createResponse = function(e, n, i) {
            void 0 === i && (i = null);
            var s = new t.ChatResponse({
                tag: n,
                eventTarget: this.eventTarget,
                isRobotReponse: e,
                response: i,
                image: e ? t.Dictionary.getRobotResponse("robot-image") : t.Dictionary.get("user-image")
            });
            return this.responses.push(s),
            this.currentResponse = s,
            this.el.querySelector("scrollable").appendChild(this.currentResponse.el),
            this.onListUpdate(s),
            s
        }
        ,
        n.prototype.scrollListTo = function(t) {
            void 0 === t && (t = null);
            try {
                var e = this.el.querySelector("scrollable")
                  , n = t ? t.el.offsetTop - 50 : 1e9;
                e.scrollTop = n,
                setTimeout(function() {
                    return e.scrollTop = n
                }, 100)
            } catch (t) {}
        }
        ,
        n.prototype.getTemplate = function() {
            return "<cf-chat type='pluto'>\n\t\t\t\t\t\t<scrollable></scrollable>\n\t\t\t\t\t</cf-chat>"
        }
        ,
        n.prototype.dealloc = function() {
            this.eventTarget.removeEventListener(t.FlowEvents.FLOW_UPDATE, this.flowUpdateCallback, !1),
            this.flowUpdateCallback = null,
            this.eventTarget.removeEventListener(t.FlowEvents.USER_INPUT_UPDATE, this.userInputUpdateCallback, !1),
            this.userInputUpdateCallback = null,
            this.eventTarget.removeEventListener(t.UserInputEvents.KEY_CHANGE, this.onInputKeyChangeCallback, !1),
            this.onInputKeyChangeCallback = null,
            e.prototype.dealloc.call(this)
        }
        ,
        n
    }(t.BasicElement);
    t.ChatList = e
}(cf || (cf = {}));
var cf;
!function(t) {
    t.FlowEvents = {
        USER_INPUT_UPDATE: "cf-flow-user-input-update",
        USER_INPUT_INVALID: "cf-flow-user-input-invalid",
        FLOW_UPDATE: "cf-flow-update"
    };
    var e = function() {
        function e(e) {
            this.stopped = !1,
            this.maxSteps = 0,
            this.step = 0,
            this.savedStep = -1,
            this.stepTimer = 0,
            this.ignoreExistingTags = !1,
            this.cfReference = e.cfReference,
            this.eventTarget = e.eventTarget,
            this.flowStepCallback = e.flowStepCallback,
            this.setTags(e.tags),
            this.maxSteps = this.tags.length,
            this.userInputSubmitCallback = this.userInputSubmit.bind(this),
            this.eventTarget.addEventListener(t.UserInputEvents.SUBMIT, this.userInputSubmitCallback, !1)
        }
        return Object.defineProperty(e.prototype, "currentTag", {
            get: function() {
                return this.tags[this.step]
            },
            enumerable: !0,
            configurable: !0
        }),
        e.prototype.userInputSubmit = function(e) {
            var n = this;
            t.ConversationalForm.illustrateFlow(this, "receive", e.type, e.detail);
            var i = e.detail
              , s = this.currentTag.setTagValueAndIsValid(i)
              , o = !1
              , a = !1
              , r = function() {
                return n.currentTag.validationCallback && "function" == typeof n.currentTag.validationCallback && !o && s ? (o = !0,
                void n.currentTag.validationCallback(i, function() {
                    s = !0,
                    r()
                }, function(t) {
                    s = !1,
                    t && (i.errorText = t),
                    r()
                })) : n.flowStepCallback && "function" == typeof n.flowStepCallback && !a && s ? (a = !0,
                void n.flowStepCallback(i, function() {
                    s = !0,
                    r()
                }, function(t) {
                    s = !1,
                    t && (i.errorText = t),
                    r()
                })) : void (s ? (t.ConversationalForm.illustrateFlow(n, "dispatch", t.FlowEvents.USER_INPUT_UPDATE, i),
                i = i.input.getFlowDTO(),
                n.eventTarget.dispatchEvent(new CustomEvent(t.FlowEvents.USER_INPUT_UPDATE,{
                    detail: i
                })),
                setTimeout(function() {
                    return n.nextStep()
                }, t.ConversationalForm.animationsEnabled ? 250 : 0)) : (t.ConversationalForm.illustrateFlow(n, "dispatch", t.FlowEvents.USER_INPUT_INVALID, i),
                n.eventTarget.dispatchEvent(new CustomEvent(t.FlowEvents.USER_INPUT_INVALID,{
                    detail: i
                }))))
            };
            r()
        }
        ,
        e.prototype.startFrom = function(t, e) {
            void 0 === e && (e = !1),
            this.step = "number" == typeof t ? t : this.tags.indexOf(t),
            this.ignoreExistingTags = e,
            this.ignoreExistingTags ? this.showStep() : this.editTag(this.tags[this.step])
        }
        ,
        e.prototype.start = function() {
            this.stopped = !1,
            this.validateStepAndUpdate()
        }
        ,
        e.prototype.stop = function() {
            this.stopped = !0
        }
        ,
        e.prototype.nextStep = function() {
            this.stopped || (-1 != this.savedStep && (this.step = this.savedStep),
            this.savedStep = -1,
            this.step++,
            this.validateStepAndUpdate())
        }
        ,
        e.prototype.previousStep = function() {
            this.step--,
            this.validateStepAndUpdate()
        }
        ,
        e.prototype.getStep = function() {
            return this.step
        }
        ,
        e.prototype.addTags = function(t, e) {
            if (void 0 === e && (e = -1),
            -1 !== e && e < this.tags.length) {
                var n = this.tags.slice(0, e)
                  , i = this.tags.slice(e, this.tags.length);
                this.tags = this.tags.slice(0, e).concat(t).concat(i)
            } else
                this.tags.concat(t);
            return this.setTags(this.tags),
            this.tags
        }
        ,
        e.prototype.dealloc = function() {
            this.eventTarget.removeEventListener(t.UserInputEvents.SUBMIT, this.userInputSubmitCallback, !1),
            this.userInputSubmitCallback = null
        }
        ,
        e.prototype.editTag = function(t) {
            this.ignoreExistingTags = !1,
            this.savedStep = this.step - 1,
            this.step = this.tags.indexOf(t),
            this.validateStepAndUpdate()
        }
        ,
        e.prototype.setTags = function(t) {
            this.tags = t;
            for (var e = 0; e < this.tags.length; e++) {
                this.tags[e].eventTarget = this.eventTarget
            }
        }
        ,
        e.prototype.skipStep = function() {
            this.nextStep()
        }
        ,
        e.prototype.validateStepAndUpdate = function() {
            this.maxSteps > 0 && (this.step == this.maxSteps ? this.cfReference.doSubmitForm() : (this.step %= this.maxSteps,
            this.currentTag.disabled ? this.skipStep() : this.showStep()))
        }
        ,
        e.prototype.showStep = function() {
            this.stopped || (t.ConversationalForm.illustrateFlow(this, "dispatch", t.FlowEvents.FLOW_UPDATE, this.currentTag),
            this.currentTag.refresh(),
            this.eventTarget.dispatchEvent(new CustomEvent(t.FlowEvents.FLOW_UPDATE,{
                detail: {
                    tag: this.currentTag,
                    ignoreExistingTag: this.ignoreExistingTags
                }
            })))
        }
        ,
        e
    }();
    e.STEP_TIME = 1e3,
    t.FlowManager = e
}(cf || (cf = {}));
var cf;
!function(cf_1) {
    var ConversationalForm = function() {
        function ConversationalForm(options) {
            if (this.version = "0.9.3",
            this.cdnPath = "//conversational-form-{version}-0iznjsw.stackpathdns.com/",
            this.isDevelopment = !1,
            this.loadExternalStyleSheet = !0,
            this.preventAutoAppend = !1,
            this.preventAutoStart = !1,
            window.ConversationalForm = this,
            this.cdnPath = this.cdnPath.split("{version}").join(this.version.split(".").join("")),
            console.log("Conversational Form > version:", this.version),
            window.ConversationalForm[this.createId] = this,
            options.eventDispatcher && (this._eventTarget = options.eventDispatcher),
            options.flowStepCallback && (this.flowStepCallback = options.flowStepCallback),
            this.isDevelopment = ConversationalForm.illustrateAppFlow = !!document.getElementById("conversational-form-development"),
            (this.isDevelopment || 0 == options.loadExternalStyleSheet) && (this.loadExternalStyleSheet = !1),
            isNaN(options.scrollAccerlation) || (cf_1.ScrollController.accerlation = options.scrollAccerlation),
            this.preventAutoStart = options.preventAutoStart,
            this.preventAutoAppend = options.preventAutoAppend,
            !options.formEl)
                throw new Error("Conversational Form error, the formEl needs to be defined.");
            this.formEl = options.formEl,
            this.formEl.setAttribute("cf-create-id", this.createId),
            this.submitCallback = options.submitCallback,
            this.submitCallback && "string" == typeof this.submitCallback && (this.submitCallback = eval(this.submitCallback)),
            "" == this.formEl.getAttribute("cf-no-animation") && (ConversationalForm.animationsEnabled = !1),
            "" == this.formEl.getAttribute("cf-prevent-autofocus") && (cf_1.UserInput.preventAutoFocus = !0),
            this.dictionary = new cf_1.Dictionary({
                data: options.dictionaryData,
                robotData: options.dictionaryRobot,
                userImage: options.userImage,
                robotImage: options.robotImage
            }),
            this.context = options.context ? options.context : document.body,
            this.tags = options.tags,
            this.init()
        }
        return Object.defineProperty(ConversationalForm.prototype, "createId", {
            get: function() {
                return this._createId || (this._createId = (new Date).getTime().toString()),
                this._createId
            },
            enumerable: !0,
            configurable: !0
        }),
        Object.defineProperty(ConversationalForm.prototype, "eventTarget", {
            get: function() {
                return this._eventTarget || (this._eventTarget = new cf_1.EventDispatcher(this)),
                this._eventTarget
            },
            enumerable: !0,
            configurable: !0
        }),
        ConversationalForm.prototype.init = function() {
            if (cf_1.Helpers.setEmojiLib(),
            this.loadExternalStyleSheet) {
                var t = document.head || document.getElementsByTagName("head")[0]
                  , e = document.createElement("link")
                  , n = this.cdnPath + "conversational-form.min.css";
                e.type = "text/css",
                e.media = "all",
                e.setAttribute("rel", "stylesheet"),
                e.setAttribute("href", n),
                t.appendChild(e)
            } else
                this.isDevelopment = !0;
            var i = window.getComputedStyle(this.context).getPropertyValue("position").toLowerCase();
            if (-1 == ["fixed", "absolute", "relative"].indexOf(i) && (this.context.style.position = "relative"),
            !this.tags || 0 == this.tags.length) {
                this.tags = [];
                for (var s = [].slice.call(this.formEl.querySelectorAll("input, select, button, textarea"), 0), o = 0; o < s.length; o++) {
                    var a = s[o];
                    cf_1.Tag.isTagValid(a) && this.tags.push(cf_1.Tag.createTag(a))
                }
            }
            for (var r = [], o = 0; o < this.tags.length; o++) {
                var a = this.tags[o];
                a && cf_1.Tag.isTagValid(a.domElement) || r.push(a)
            }
            for (var o = 0; o < r.length; o++) {
                var l = r[o];
                this.tags.splice(this.tags.indexOf(l), 1)
            }
            return this.tags && 0 != this.tags.length || console.warn("Conversational Form: No tags found or registered."),
            this.tags = this.setupTagGroups(this.tags),
            this.setupUI(),
            this
        }
        ,
        ConversationalForm.prototype.updateDictionaryValue = function(t, e, n) {
            cf_1.Dictionary.set(t, e, n),
            -1 != ["robot-image", "user-image"].indexOf(t) && this.chatList.updateThumbnail("robot-image" == t, n)
        }
        ,
        ConversationalForm.prototype.getFormData = function(t) {
            if (void 0 === t && (t = !1),
            t) {
                for (var e = {}, n = 0; n < this.tags.length; n++) {
                    var i = this.tags[n];
                    i.value && (e[i.name || "tag-" + n.toString()] = i.value)
                }
                return e
            }
            return new FormData(this.formEl)
        }
        ,
        ConversationalForm.prototype.addRobotChatResponse = function(t) {
            this.chatList.createResponse(!0, null, t)
        }
        ,
        ConversationalForm.prototype.addUserChatResponse = function(t) {
            this.chatList.createResponse(!1, null, t)
        }
        ,
        ConversationalForm.prototype.stop = function(t) {
            void 0 === t && (t = ""),
            this.flowManager.stop(),
            "" != t && this.chatList.createResponse(!0, null, t),
            this.userInput.onFlowStopped()
        }
        ,
        ConversationalForm.prototype.start = function() {
            this.userInput.disabled = !1,
            this.userInput.visible = !0,
            this.flowManager.start()
        }
        ,
        ConversationalForm.prototype.getTag = function(t) {
            return "number" == typeof t ? this.tags[t] : null
        }
        ,
        ConversationalForm.prototype.setupTagGroups = function(t) {
            for (var e = [], n = 0; n < t.length; n++) {
                var i = t[n];
                "radio" != i.type && "checkbox" != i.type || (e[i.name] || (e[i.name] = []),
                e[i.name].push(i))
            }
            if (Object.keys(e).length > 0)
                for (var s in e)
                    if (e[s].length > 0)
                        for (var o = new cf_1.TagGroup({
                            elements: e[s]
                        }), n = 0; n < e[s].length; n++) {
                            var a = e[s][n];
                            0 == n ? t.splice(t.indexOf(a), 1, o) : t.splice(t.indexOf(a), 1)
                        }
            return t
        }
        ,
        ConversationalForm.prototype.setupUI = function() {
            this.flowManager = new cf_1.FlowManager({
                cfReference: this,
                flowStepCallback: this.flowStepCallback,
                eventTarget: this.eventTarget,
                tags: this.tags
            }),
            this.el = document.createElement("div"),
            this.el.id = "conversational-form",
            this.el.className = "conversational-form",
            ConversationalForm.animationsEnabled && this.el.classList.add("conversational-form--enable-animation"),
            this.preventAutoAppend || this.context.appendChild(this.el),
            this.el.style.visibility = "hidden";
            var t = document.createElement("div");
            t.className = "conversational-form-inner",
            this.el.appendChild(t),
            this.chatList = new cf_1.ChatList({
                eventTarget: this.eventTarget
            }),
            t.appendChild(this.chatList.el),
            this.userInput = new cf_1.UserInput({
                eventTarget: this.eventTarget,
                cfReference: this
            }),
            t.appendChild(this.userInput.el),
            this.onUserAnswerClickedCallback = this.onUserAnswerClicked.bind(this),
            this.eventTarget.addEventListener(cf_1.ChatResponseEvents.USER_ANSWER_CLICKED, this.onUserAnswerClickedCallback, !1),
            this.el.classList.add("conversational-form--show"),
            this.preventAutoStart || this.flowManager.start(),
            this.tags && 0 != this.tags.length || (this.userInput.visible = !0)
        }
        ,
        ConversationalForm.prototype.onUserAnswerClicked = function(t) {
            var e = t.detail;
            this.flowManager.editTag(e)
        }
        ,
        ConversationalForm.prototype.addTags = function(t, e, n) {
            void 0 === e && (e = !0),
            void 0 === n && (n = -1);
            for (var i = [], s = 0; s < t.length; s++) {
                var o = t[s];
                if ("fieldset" === o.tag)
                    for (var a = cf_1.TagsParser.parseGroupTag(o), r = 0; r < a.children.length; r++) {
                        var l = a.children[r];
                        if (cf_1.Tag.isTagValid(l)) {
                            var u = cf_1.Tag.createTag(l);
                            u.name || (u.name = "tag-ref-" + r.toString()),
                            i.push(u)
                        }
                    }
                else {
                    var l = cf_1.TagsParser.parseTag(o);
                    if (cf_1.Tag.isTagValid(l)) {
                        var u = cf_1.Tag.createTag(l);
                        i.push(u)
                    }
                }
            }
            i = this.setupTagGroups(i),
            this.tags = this.flowManager.addTags(i, e ? this.flowManager.getStep() + 1 : n)
        }
        ,
        ConversationalForm.prototype.remapTagsAndStartFrom = function(t, e, n) {
            void 0 === t && (t = 0),
            void 0 === e && (e = !1),
            void 0 === n && (n = !1),
            e && this.chatList.setCurrentUserResponse(this.userInput.getFlowDTO());
            for (var i = 0; i < this.tags.length; i++) {
                this.tags[i].refresh()
            }
            this.flowManager.startFrom(t, n)
        }
        ,
        ConversationalForm.prototype.focus = function() {
            this.userInput && this.userInput.setFocusOnInput()
        }
        ,
        ConversationalForm.prototype.doSubmitForm = function() {
            if (this.el.classList.add("done"),
            this.userInput.reset(),
            this.submitCallback)
                this.submitCallback(this);
            else {
                var t = this.formEl.ownerDocument.createElement("input");
                t.style.display = "none",
                t.type = "submit",
                this.formEl.appendChild(t),
                t.click(),
                this.formEl.removeChild(t),
                this.remove()
            }
        }
        ,
        ConversationalForm.prototype.remove = function() {
            this.onUserAnswerClickedCallback && (this.eventTarget.removeEventListener(cf_1.ChatResponseEvents.USER_ANSWER_CLICKED, this.onUserAnswerClickedCallback, !1),
            this.onUserAnswerClickedCallback = null),
            this.flowManager && this.flowManager.dealloc(),
            this.userInput && this.userInput.dealloc(),
            this.chatList && this.chatList.dealloc(),
            this.dictionary = null,
            this.flowManager = null,
            this.userInput = null,
            this.chatList = null,
            this.context = null,
            this.formEl = null,
            this.tags = null,
            this.submitCallback = null,
            this.el.parentNode.removeChild(this.el),
            this.el = null,
            window.ConversationalForm[this.createId] = null
        }
        ,
        ConversationalForm.illustrateFlow = function(t, e, n, i) {
            if (void 0 === i && (i = null),
            ConversationalForm.illustrateAppFlow) {
                var s = "font-weight: 900; background: " + ("receive" == e ? "#e6f3fe" : "pink") + "; color: black; padding: 0px 5px;";
                console.log("%c** event flow: %c" + n + "%c flow type: %c" + e + "%c from: %c" + t.constructor.name, "font-weight: 900;", s, "font-weight: 400;", s, "font-weight: 400;", s),
                i && console.log("** event flow detail:", i)
            }
        }
        ,
        ConversationalForm.startTheConversation = function(t) {
            var e = !1 == !!t.formEl, n, i;
            if (e) {
                if ("string" == typeof t) {
                    e = !0;
                    var s = JSON.parse(t);
                    i = s.options,
                    n = s.tags
                } else
                    i = t.options,
                    n = t.tags;
                var o = cf.TagsParser.parseJSONIntoElements(n);
                i.formEl = o
            } else
                i = t;
            return new cf.ConversationalForm(i)
        }
        ,
        ConversationalForm.autoStartTheConversation = function() {
            if (!cf.ConversationalForm.hasAutoInstantiated) {
                var t = document.querySelectorAll("form[cf-form]");
                0 === t.length && (t = document.querySelectorAll("form[cf-form-element]"));
                var e = document.querySelectorAll("*[cf-context]");
                if (t && t.length > 0) {
                    for (var n = 0; n < t.length; n++) {
                        var i = t[n]
                          , s = e[n];
                        cf.ConversationalForm.startTheConversation({
                            formEl: i,
                            context: s
                        })
                    }
                    cf.ConversationalForm.hasAutoInstantiated = !0
                }
            }
        }
        ,
        ConversationalForm
    }();
    ConversationalForm.animationsEnabled = !0,
    ConversationalForm.illustrateAppFlow = !0,
    ConversationalForm.hasAutoInstantiated = !1,
    cf_1.ConversationalForm = ConversationalForm
}(cf || (cf = {})),
"complete" == document.readyState ? setTimeout(function() {
    return cf.ConversationalForm.autoStartTheConversation()
}, 0) : window.addEventListener("load", function() {
    cf.ConversationalForm.autoStartTheConversation()
}, !1),
function(t) {
    var e = !1;
    if ("function" == typeof define && define.amd && (define(t),
    e = !0),
    "object" == typeof exports && (module.exports = t(),
    e = !0),
    !e) {
        var n = window.Cookies
          , i = window.Cookies = t();
        i.noConflict = function() {
            return window.Cookies = n,
            i
        }
    }
}(function() {
    function t() {
        for (var t = 0, e = {}; t < arguments.length; t++) {
            var n = arguments[t];
            for (var i in n)
                e[i] = n[i]
        }
        return e
    }
    function e(n) {
        function i(e, s, o) {
            var a;
            if ("undefined" != typeof document) {
                if (arguments.length > 1) {
                    if (o = t({
                        path: "/"
                    }, i.defaults, o),
                    "number" == typeof o.expires) {
                        var r = new Date;
                        r.setMilliseconds(r.getMilliseconds() + 864e5 * o.expires),
                        o.expires = r
                    }
                    o.expires = o.expires ? o.expires.toUTCString() : "";
                    try {
                        a = JSON.stringify(s),
                        /^[\{\[]/.test(a) && (s = a)
                    } catch (t) {}
                    s = n.write ? n.write(s, e) : encodeURIComponent(String(s)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent),
                    e = encodeURIComponent(String(e)),
                    e = e.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent),
                    e = e.replace(/[\(\)]/g, escape);
                    var l = "";
                    for (var u in o)
                        o[u] && (l += "; " + u,
                        !0 !== o[u] && (l += "=" + o[u]));
                    return document.cookie = e + "=" + s + l
                }
                e || (a = {});
                for (var c = document.cookie ? document.cookie.split("; ") : [], h = /(%[0-9A-Z]{2})+/g, p = 0; p < c.length; p++) {
                    var d = c[p].split("=")
                      , m = d.slice(1).join("=");
                    '"' === m.charAt(0) && (m = m.slice(1, -1));
                    try {
                        var f = d[0].replace(h, decodeURIComponent);
                        if (m = n.read ? n.read(m, f) : n(m, f) || m.replace(h, decodeURIComponent),
                        this.json)
                            try {
                                m = JSON.parse(m)
                            } catch (t) {}
                        if (e === f) {
                            a = m;
                            break
                        }
                        e || (a[f] = m)
                    } catch (t) {}
                }
                return a
            }
        }
        return i.set = i,
        i.get = function(t) {
            return i.call(i, t)
        }
        ,
        i.getJSON = function() {
            return i.apply({
                json: !0
            }, [].slice.call(arguments))
        }
        ,
        i.defaults = {},
        i.remove = function(e, n) {
            i(e, "", t(n, {
                expires: -1
            }))
        }
        ,
        i.withConverter = e,
        i
    }
    return e(function() {})
}),
/**
 * @preserve
 * Sharer.js
 *
 * @description Create your own social share buttons
 * @version 0.2.17
 * @author Ellison Leao <ellisonleao@gmail.com>
 * @license GPLv3
 *
 */
function(t, e) {
    "use strict";
    var n = function(t) {
        this.elem = t
    };
    n.prototype = {
        constructor: n,
        getValue: function(t) {
            var e = this.elem.getAttribute("data-" + t);
            return void 0 !== e && null !== e && e
        },
        share: function() {
            var t = this.getValue("sharer").toLowerCase()
              , e = {
                facebook: {
                    shareUrl: "https://www.facebook.com/sharer/sharer.php",
                    params: {
                        u: this.getValue("url")
                    }
                },
                googleplus: {
                    shareUrl: "https://plus.google.com/share",
                    params: {
                        url: this.getValue("url")
                    }
                },
                linkedin: {
                    shareUrl: "https://www.linkedin.com/shareArticle",
                    params: {
                        url: this.getValue("url"),
                        mini: !0
                    }
                },
                twitter: {
                    shareUrl: "https://twitter.com/intent/tweet/",
                    params: {
                        text: this.getValue("title"),
                        url: this.getValue("url"),
                        hashtags: this.getValue("hashtags"),
                        via: this.getValue("via")
                    }
                },
                email: {
                    shareUrl: "mailto:" + this.getValue("to"),
                    params: {
                        subject: this.getValue("subject"),
                        body: this.getValue("title") + "\n" + this.getValue("url")
                    },
                    isLink: !0
                },
                whatsapp: {
                    shareUrl: "whatsapp://send",
                    params: {
                        text: this.getValue("title") + " " + this.getValue("url")
                    },
                    isLink: !0
                },
                telegram: {
                    shareUrl: "tg://msg_url",
                    params: {
                        text: this.getValue("title") + " " + this.getValue("url")
                    },
                    isLink: !0
                },
                viber: {
                    shareUrl: "viber://forward",
                    params: {
                        text: this.getValue("title") + " " + this.getValue("url")
                    },
                    isLink: !0
                },
                line: {
                    shareUrl: "http://line.me/R/msg/text/?" + encodeURIComponent(this.getValue("title") + " " + this.getValue("url")),
                    isLink: !0
                },
                pinterest: {
                    shareUrl: "https://www.pinterest.com/pin/create/button/",
                    params: {
                        url: this.getValue("url"),
                        media: this.getValue("image"),
                        description: this.getValue("description")
                    }
                },
                tumblr: {
                    shareUrl: "http://tumblr.com/widgets/share/tool",
                    params: {
                        canonicalUrl: this.getValue("url"),
                        content: this.getValue("url"),
                        posttype: "link",
                        title: this.getValue("title"),
                        caption: this.getValue("caption"),
                        tags: this.getValue("tags")
                    }
                },
                hackernews: {
                    shareUrl: "https://news.ycombinator.com/submitlink",
                    params: {
                        u: this.getValue("url"),
                        t: this.getValue("title")
                    }
                },
                reddit: {
                    shareUrl: "https://www.reddit.com/submit",
                    params: {
                        url: this.getValue("url")
                    }
                },
                vk: {
                    shareUrl: "http://vk.com/share.php",
                    params: {
                        url: this.getValue("url"),
                        title: this.getValue("title"),
                        description: this.getValue("caption"),
                        image: this.getValue("image")
                    }
                },
                xing: {
                    shareUrl: "https://www.xing.com/app/user",
                    params: {
                        op: "share",
                        url: this.getValue("url"),
                        title: this.getValue("title")
                    }
                },
                buffer: {
                    shareUrl: "https://buffer.com/add",
                    params: {
                        url: this.getValue("url"),
                        title: this.getValue("title"),
                        via: this.getValue("via"),
                        picture: this.getValue("picture")
                    }
                },
                instapaper: {
                    shareUrl: "http://www.instapaper.com/edit",
                    params: {
                        url: this.getValue("url"),
                        title: this.getValue("title"),
                        description: this.getValue("description")
                    }
                },
                pocket: {
                    shareUrl: "https://getpocket.com/save",
                    params: {
                        url: this.getValue("url")
                    }
                },
                digg: {
                    shareUrl: "http://www.digg.com/submit",
                    params: {
                        url: this.getValue("url")
                    }
                },
                stumbleupon: {
                    shareUrl: "http://www.stumbleupon.com/submit",
                    params: {
                        url: this.getValue("url"),
                        title: this.getValue("title")
                    }
                },
                flipboard: {
                    shareUrl: "https://share.flipboard.com/bookmarklet/popout",
                    params: {
                        v: 2,
                        title: this.getValue("title"),
                        url: this.getValue("url"),
                        t: Date.now()
                    }
                },
                weibo: {
                    shareUrl: "http://service.weibo.com/share/share.php",
                    params: {
                        url: this.getValue("url"),
                        title: this.getValue("title"),
                        pic: this.getValue("image"),
                        appkey: this.getValue("appkey"),
                        ralateUid: this.getValue("ralateuid"),
                        language: "zh_cn"
                    }
                },
                renren: {
                    shareUrl: "http://share.renren.com/share/buttonshare",
                    params: {
                        link: this.getValue("url")
                    }
                },
                myspace: {
                    shareUrl: "https://myspace.com/post",
                    params: {
                        u: this.getValue("url"),
                        t: this.getValue("title"),
                        c: this.getValue("description")
                    }
                },
                blogger: {
                    shareUrl: "https://www.blogger.com/blog-this.g",
                    params: {
                        u: this.getValue("url"),
                        n: this.getValue("title"),
                        t: this.getValue("description")
                    }
                },
                baidu: {
                    shareUrl: "http://cang.baidu.com/do/add",
                    params: {
                        it: this.getValue("title"),
                        iu: this.getValue("url")
                    }
                },
                douban: {
                    shareUrl: "https://www.douban.com/share/service",
                    params: {
                        name: this.getValue("title"),
                        href: this.getValue("url"),
                        image: this.getValue("image")
                    }
                },
                okru: {
                    shareUrl: "https://connect.ok.ru/dk",
                    params: {
                        "st.cmd": "WidgetSharePreview",
                        "st.shareUrl": this.getValue("url"),
                        title: this.getValue("title")
                    }
                },
                mailru: {
                    shareUrl: "http://connect.mail.ru/share",
                    params: {
                        share_url: this.getValue("url"),
                        linkname: this.getValue("title"),
                        linknote: this.getValue("description"),
                        type: "page"
                    }
                }
            }
              , n = e[t];
            return n && (n.width = this.getValue("width"),
            n.height = this.getValue("height")),
            void 0 !== n && this.urlSharer(n)
        },
        urlSharer: function(e) {
            var n = e.params || {}, i = Object.keys(n), s, o = i.length > 0 ? "?" : "";
            for (s = 0; s < i.length; s++)
                "?" !== o && (o += "&"),
                n[i[s]] && (o += i[s] + "=" + encodeURIComponent(n[i[s]]));
            if (e.shareUrl += o,
            e.isLink)
                t.location.href = e.shareUrl;
            else {
                var a = e.width || 600
                  , r = e.height || 480
                  , l = t.innerWidth / 2 - a / 2 + t.screenX
                  , u = t.innerHeight / 2 - r / 2 + t.screenY
                  , c = "scrollbars=no, width=" + a + ", height=" + r + ", top=" + u + ", left=" + l
                  , h = t.open(e.shareUrl, "", c);
                t.focus && h.focus()
            }
        }
    },
    t.addEventListener("load", function() {
        function t(t) {
            var e = t.currentTarget || t.srcElement;
            new n(e).share()
        }
        var i = e.querySelectorAll(".sharer"), s, o = i.length;
        for (s = 0; s < o; s++)
            i[s].addEventListener("click", t)
    })
}(window, document);
var timeouts = []
  , apiLocation = "http://dysh-backend.herokuapp.com/api/"
  , siteUrl = "https://www.space10.io/";
window.location.href.match("macbook-pro-van-pieter.local") ? siteUrl = "http://macbook-pro-van-pieter.local:5757" : window.location.href.match("http://staging.pieter-de-jong.nl/doyouspeakhuman") && (siteUrl = "http://staging.pieter-de-jong.nl/doyouspeakhuman"),
$.fn.serializeObject = function() {
    var t = {}
      , e = this.serializeArray();
    return $.each(e, function() {
        void 0 !== t[this.name] ? (t[this.name].push || (t[this.name] = [t[this.name]]),
        t[this.name].push(this.value || "")) : t[this.name] = this.value || ""
    }),
    t
}
;
var doc = document.documentElement;
doc.setAttribute("data-useragent", navigator.userAgent),
document.addEventListener("visibilitychange", handleVisibilityChange, !1),
setTimeout(function() {
    $("body").removeClass("is-loading"),
    window.location.hash && $.isNumeric(window.location.hash.substring(1)) || $(".pane__video")[0].play()
}, 3e3),
window.location.href.match("macbook-pro-van-pieter.local") && ($("body").removeClass("is-loading"),
$(".pane__video")[0].volume = 0),
$(".logo").mouseenter(function() {
    $("body").addClass("project-information")
}),
$(".logo").mouseleave(function() {
    $("body").removeClass("project-information")
});
var currentScenarioNumber = 1
  , flashScenarioNumber = 3
  , shouldFlash = !1;
$(".pane--main").click(function() {
    $(this).hasClass("pane--step-1") && !$(".main").hasClass("main--scenario-1") ? goToScenario(1) : $(this).hasClass("pane--step-2") && !$(".main").hasClass("main--scenario-2") ? goToScenario(2) : $(this).hasClass("pane--step-3") && !$(".main").hasClass("main--scenario-3") ? goToScenario(3) : $(this).hasClass("pane--step-4") && !$(".main").hasClass("main--scenario-4") && goToScenario(4)
}),
$(".pane--main").mouseenter(function() {
    $(this).hasClass("pane--step-1") && !$(".main").hasClass("main--scenario-1") ? $(".navigation__list__item:nth-child(1) .navigation__list__item__button").addClass("is-highlighted") : $(this).hasClass("pane--step-2") && !$(".main").hasClass("main--scenario-2") ? $(".navigation__list__item:nth-child(2) .navigation__list__item__button").addClass("is-highlighted") : $(this).hasClass("pane--step-3") && !$(".main").hasClass("main--scenario-3") ? $(".navigation__list__item:nth-child(3) .navigation__list__item__button").addClass("is-highlighted") : $(this).hasClass("pane--step-4") && !$(".main").hasClass("main--scenario-4") && $(".navigation__list__item:nth-child(4) .navigation__list__item__button").addClass("is-highlighted")
}),
$(".pane--main").mouseleave(function() {
    $(".navigation__list__item__button").removeClass("is-highlighted")
}),
$(".navigation__title").click(function(t) {
    isDesktopVersion() && goToScenario(1),
    t.preventDefault()
}),
$(".navigation__list__item__button").click(function(t) {
    $(this).hasClass("is-active") || goToScenario($(this).parent().index() + 1),
    t.preventDefault()
}),
$(".pane__video").click(function() {
    !1 === this.paused ? this.pause() : this.play()
}),
$(".pane__video").bind("ended", function() {
    goToScenario(2)
}),
$(".pane__video").on("play", function() {
    $(this).parent().toggleClass("is-playing")
}),
$(".pane__video").on("pause", function() {
    $(this).parent().toggleClass("is-playing")
});
var questionCopy = {
    ai_form: {
        question: "What form should your AI take?",
        answers: {
            human: "Humanlike",
            robotic: "Robotic"
        }
    },
    ai_gender: {
        question: "What gender should your AI be?",
        answers: {
            male: "Male",
            female: "Female",
            gender_neutral: "Gender neutral"
        }
    },
    ai_values_worldview: {
        question: "Should your AI reflect your values and worldview?",
        answers: {
            yes: "Yes",
            no: "No"
        }
    },
    ai_detect_emotions: {
        question: "Should your AI be able to detect and react to emotions?",
        answers: {
            yes: "Yes",
            no: "No"
        }
    },
    ai_religious: {
        question: "Do you want your AI to be religious?",
        answers: {
            yes: "Yes",
            no: "No"
        }
    },
    ai_learn_daily_habits: {
        question: "Should your AI fulfil your needs before you ask?",
        answers: {
            yes: "Yes",
            no: "No"
        }
    },
    ai_give_up_data: {
        question: "Should your AI collect your data to improve the experience?",
        answers: {
            yes: "Yes",
            no: "No",
            anonymous: "Only when the data is anonymous "
        }
    },
    ai_behave: {
        question: "How do you want your AI to behave?",
        answers: {
            motherly_and_protective: "Motherly and protective",
            autonomous_and_challenging: "Autonomous and challenging",
            obedient_and_assisting: "Obedient and assisting"
        }
    },
    ai_intervene: {
        question: "Should your AI prevent you from making mistakes?",
        answers: {
            yes: "Yes",
            no: "No"
        }
    },
    user_gender: {
        question: "Now tell us a little bit about yourself so we can have some more meaningful results.<br><br>What&rsquo;s your gender?",
        answers: {
            male: "Male",
            female: "Female"
        }
    },
    user_age: {
        question: "What’s your age group?",
        answers: {
            "17_and_under": "17 and under",
            "18-24": "18 - 24",
            "25-29": "25 - 29",
            "30-39": "30 - 39",
            "40-59": "40 - 59",
            "60_and_over": "60 and over"
        }
    },
    user_kept_in_loop: {
        question: "Would you like to be kept in the loop on this study?",
        answers: {
            yes: "Yes",
            no: "No"
        }
    },
    user_email: {
        question: "What&rsquo;s your email address?"
    }
}, resultsCopy = {
    1: {
        male: "[Male]",
        female: "[Female]",
        gender_neutral: "[Gender Neutral]",
        robotic: "[Robotic]"
    },
    2: {
        professional: "professional",
        friendly: "friendly",
        flirtatious: "flirtatious",
        differentiated: "moody"
    },
    3: {
        asian: "asian",
        latin: "latin",
        african: "african",
        eastern: "eastern",
        western: "western",
        "middle-eastern": "middle-eastern",
        indigenous: "indigenous",
        universal: "universal"
    },
    4: {
        yes: "religious",
        no: "non-religious"
    },
    5: {
        entertainment: "[Entertainment]",
        "well-being": "[Well-being]",
        personal_assisting: "[Personal assisting]",
        housekeeping: "[Housekeeping]",
        shopping: "[Shopping]",
        love_life: "[Love] life"
    },
    6: {
        yes: "autonomous",
        no: "obedient"
    },
    7: {
        private_companies: "I promise to share your data with privately held companies to constantly become smarter and grow more powerful.",
        governments: "I promise to share your data with the government to constantly become smarter and grow more powerful.",
        developer_community: "I promise to share your data with the developer community to constantly become smarter and grow more powerful.",
        only_you: "In order to protect your privacy, I will keep your data between you and me."
    },
    8: {
        yes: "And no worries, I will prevent you from making bad decisions and stupid mistakes.",
        no: "And no worries, you’ll still have the freedom to make bad decisions and stupid mistakes."
    }
}, sendSubmission = {
    submission: {
        questions: ""
    }
}, receivedSubmissionId;
Cookies.get("receivedSubmissionId") && (receivedSubmissionId = Cookies.get("receivedSubmissionId"));
var receivedSubmission = {}
  , msBetweenResponses = 1400
  , resultFormDelay = 0
  , assemblyFormInitialized = !1
  , resultForm = ""
  , resultFormInitialized = !1
  , robotResponse1 = ""
  , robotResponse2 = ""
  , robotResponse3 = ""
  , robotResponse4 = "";
$(".js-show-random-ai").click(function() {
    $.getJSON(apiLocation + "accounts/1/forms/1/submissions/random/?include=responses,responses.answer_option,text_responses", function(t) {
        resultFormDelay = 0,
        receivedSubmissionId = t.id,
        destroyResultForm(),
        goToScenario(3)
    })
}),
window.location.hash && $.isNumeric(window.location.hash.substring(1)) && $.getJSON(apiLocation + "accounts/1/forms/1/submissions/" + window.location.hash.substring(1) + "/?include=responses,responses.answer_option,text_responses", function(t) {
    resultFormDelay = 0,
    receivedSubmissionId = t.id,
    destroyResultForm(),
    goToScenario(3)
}),
$(".pane--step-3.pane--additional").click(function() {
    $(".main").hasClass("main--scenario-3") && ($(".pane--step-3.pane--additional").hasClass("is-on-top") || ($("body").addClass("disable-transitions"),
    setTimeout(function() {
        $(".pane--step-3.pane--additional").addClass("is-on-top")
    }, 10),
    setTimeout(function() {
        $("body").removeClass("disable-transitions")
    }, 100)))
}),
$(".pane--step-3.pane--main").click(function() {
    $(".main").hasClass("main--scenario-3") && $(".pane--step-3.pane--additional").hasClass("is-on-top") && ($("body").addClass("disable-transitions"),
    setTimeout(function() {
        $(".pane--step-3.pane--additional").removeClass("is-on-top")
    }, 10),
    setTimeout(function() {
        $("body").removeClass("disable-transitions")
    }, 100))
}),
$(".overview__snippet__button").click(function(t) {
    openOverviewPane(),
    t.stopPropagation()
}),
$(".pane--overview").click(function(t) {
    $(".share-list").hasClass("is-visible") || t.stopPropagation()
}),
$(".pane__faq__item").click(function() {
    $(this).toggleClass("is-active").siblings().removeClass("is-active")
}),
$(".pane--step-4.pane--additional").click(function() {
    $(".main").hasClass("main--scenario-4") && ($(".pane--step-4.pane--additional").hasClass("is-on-top") || ($("body").addClass("disable-transitions"),
    setTimeout(function() {
        $(".pane--step-4.pane--additional").addClass("is-on-top")
    }, 10),
    setTimeout(function() {
        $("body").removeClass("disable-transitions")
    }, 100)))
}),
$(".pane--step-4.pane--main").click(function() {
    $(".main").hasClass("main--scenario-4") && $(".pane--step-4.pane--additional").hasClass("is-on-top") && ($("body").addClass("disable-transitions"),
    setTimeout(function() {
        $(".pane--step-4.pane--additional").removeClass("is-on-top")
    }, 10),
    setTimeout(function() {
        $("body").removeClass("disable-transitions")
    }, 100))
}),
$(".share-button").mouseenter(function(t) {
    if ($(".share-list").hasClass("is-visible"))
        closeShareList();
    else {
        isDesktopVersion() ? $(this).parent().hasClass("pane__inner") && $(".share-list").addClass("share-list--dark") : $(this).parent().hasClass("pane__inner") || $(".share-list").addClass("share-list--dark");
        var e = $(this).data("title")
          , n = $(this).data("url");
        $(".share-list__item__button").attr("data-title", e).attr("data-url", n);
        var i = $(this).offset()
          , s = i.top
          , o = i.left
          , a = $(window).width() - (o + $(this).outerWidth());
        isMobileVersion() && (s -= $(window).scrollTop()),
        $(".share-list").css("top", s),
        $(".share-list").css("right", a),
        $(".share-list").addClass("is-visible"),
        s + $(".share-list").outerHeight() > $(window).height() && $(".share-list").css("margin-top", -($(".share-list").outerHeight() - 30)),
        t.stopPropagation()
    }
}),
$(".share-list").mouseleave(function(t) {
    closeShareList()
}),
$.getJSON(apiLocation + "accounts/1/forms/2/statistics", function(t) {
    $.each(t.statistics.questions, function(t, e) {
        if (e.question.public_question && "select" === e.question.question_type) {
            var n = "";
            n += '<div class="statistics__item">',
            n += '<h3 class="statistics__item__title">' + questionCopy[e.question.question].question + "</h3>",
            n += '<div class="statistics__item__chart"></div>',
            n += '<ol class="statistics__item__list">';
            var i = 0
              , s = 0
              , o = 0;
            $.each(e.answer_options, function(t, e) {
                i += e.responses_count,
                e.responses_count > s && (o = e.answer,
                s = e.responses_count)
            }),
            $.each(e.answer_options, function(t, s) {
                var a = "";
                o == s.answer && (a = "is-highlighted"),
                n += '<li class="statistics__item__list__item ' + a + '" data-name="' + questionCopy[e.question.question].answers[s.answer] + '" data-amount="' + s.responses_count + '">' + Math.round(s.responses_count / i * 100) + "% " + questionCopy[e.question.question].answers[s.answer] + "</li>"
            }),
            n += "</ol>",
            n += "</div>",
            $(".pane--overview .statistics").append(n)
        }
    }),
    $.fn.random = function() {
        return this.eq(Math.floor(Math.random() * this.length))
    }
    ;
    var e = $(".pane--overview .statistics__item").random().clone();
    $(".overview__snippet").prepend(e),
    google.charts.setOnLoadCallback(drawOverviewChart)
}),
google.charts.load("current", {
    packages: ["corechart"]
});
var audio5js, panesAreMoving = !1;
$(window).width() > 1024 && (initAudio(),
$("body").on("mouseenter", ".navigation__list__item__button:not(.is-active), .share-list__item__button, .main--scenario-1 .pane--main:not(.pane--step-1), .main--scenario-2 .pane--main:not(.pane--step-2), .main--scenario-3 .pane--main:not(.pane--step-3), .main--scenario-4 .pane--main:not(.pane--step-4)", function() {
    panesAreMoving || (audio5js.load("audio/link-hover-" + getRandomArbitrary(1, 4) + ".wav"),
    audio5js.play())
}),
$("body").on("mouseenter", ".logo", function() {
    audio5js.load("audio/pane-move.wav"),
    setTimeout(function() {
        audio5js.play()
    }, 200)
})),
$(".navigation__title, .navigation__toggle").click(function(t) {
    $("body").toggleClass("navigation-is-active"),
    t.preventDefault()
}),
$(".navigation__list__item__button").click(function() {
    $("body").removeClass("navigation-is-active")
});
