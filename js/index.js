/******/ !function(modules) {
    // webpackBootstrap
    /******/
    function hotDisposeChunk(chunkId) {
        /******/
        delete installedChunks[chunkId];
    }
    /******/
    /******/
    function hotDownloadUpdateChunk(chunkId) {
        // eslint-disable-line no-unused-vars
        /******/
        var head = document.getElementsByTagName("head")[0], script = document.createElement("script");
        /******/
        script.type = "text/javascript", /******/
        script.charset = "utf-8", /******/
        script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js", 
        /******/
        head.appendChild(script);
    }
    /******/
    /******/
    function hotDownloadManifest(requestTimeout) {
        /******/
        // eslint-disable-line no-unused-vars
        /******/
        return requestTimeout = requestTimeout || 1e4, new Promise(function(resolve, reject) {
            /******/
            if ("undefined" == typeof XMLHttpRequest) /******/
            return reject(new Error("No browser support"));
            /******/
            try {
                /******/
                var request = new XMLHttpRequest(), requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
                /******/
                request.open("GET", requestPath, !0), /******/
                request.timeout = requestTimeout, /******/
                request.send(null);
            } catch (err) {
                /******/
                return reject(err);
            }
            /******/
            request.onreadystatechange = function() {
                /******/
                if (4 === request.readyState) /******/
                if (0 === request.status) /******/
                // timeout
                /******/
                reject(new Error("Manifest request to " + requestPath + " timed out.")); else if (404 === request.status) /******/
                // no update available
                /******/
                resolve(); else if (200 !== request.status && 304 !== request.status) /******/
                // other failure
                /******/
                reject(new Error("Manifest request to " + requestPath + " failed.")); else {
                    /******/
                    // success
                    /******/
                    try {
                        /******/
                        var update = JSON.parse(request.responseText);
                    } catch (e) {
                        /******/
                        /******/
                        return void reject(e);
                    }
                    /******/
                    resolve(update);
                }
            };
        });
    }
    // eslint-disable-line no-unused-vars
    /******/
    /******/
    function hotCreateRequire(moduleId) {
        // eslint-disable-line no-unused-vars
        /******/
        var me = installedModules[moduleId];
        /******/
        if (!me) return __webpack_require__;
        /******/
        var fn = function(request) {
            /******/
            /******/
            /******/
            /******/
            /******/
            /******/
            /******/
            /******/
            /******/
            /******/
            /******/
            return me.hot.active ? (installedModules[request] ? installedModules[request].parents.indexOf(moduleId) < 0 && installedModules[request].parents.push(moduleId) : (hotCurrentParents = [ moduleId ], 
            hotCurrentChildModule = request), me.children.indexOf(request) < 0 && me.children.push(request)) : (console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId), 
            hotCurrentParents = []), __webpack_require__(request);
        }, ObjectFactory = function ObjectFactory(name) {
            /******/
            return {
                /******/
                configurable: !0,
                /******/
                enumerable: !0,
                /******/
                get: function() {
                    /******/
                    return __webpack_require__[name];
                },
                /******/
                set: function(value) {
                    /******/
                    __webpack_require__[name] = value;
                }
            };
        };
        /******/
        for (var name in __webpack_require__) /******/
        Object.prototype.hasOwnProperty.call(__webpack_require__, name) && "e" !== name && /******/
        Object.defineProperty(fn, name, ObjectFactory(name));
        /******/
        /******/
        return fn.e = function(chunkId) {
            /******/
            /******/
            function finishChunkLoading() {
                /******/
                hotChunksLoading--, /******/
                "prepare" === hotStatus && (/******/
                hotWaitingFilesMap[chunkId] || /******/
                hotEnsureUpdateChunk(chunkId), /******/
                0 === hotChunksLoading && 0 === hotWaitingFiles && /******/
                hotUpdateDownloaded());
            }
            /******/
            /******/
            /******/
            /******/
            return "ready" === hotStatus && hotSetStatus("prepare"), hotChunksLoading++, __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
                /******/
                /******/
                throw finishChunkLoading(), err;
            });
        }, fn;
    }
    /******/
    /******/
    function hotCreateModule(moduleId) {
        // eslint-disable-line no-unused-vars
        /******/
        var hot = {
            /******/
            // private stuff
            /******/
            _acceptedDependencies: {},
            /******/
            _declinedDependencies: {},
            /******/
            _selfAccepted: !1,
            /******/
            _selfDeclined: !1,
            /******/
            _disposeHandlers: [],
            /******/
            _main: hotCurrentChildModule !== moduleId,
            /******/
            /******/
            // Module API
            /******/
            active: !0,
            /******/
            accept: function(dep, callback) {
                /******/
                if (void 0 === dep) /******/
                hot._selfAccepted = !0; else if ("function" == typeof dep) /******/
                hot._selfAccepted = dep; else if ("object" == typeof dep) /******/
                for (var i = 0; i < dep.length; i++) /******/
                hot._acceptedDependencies[dep[i]] = callback || function() {}; else /******/
                hot._acceptedDependencies[dep] = callback || function() {};
            },
            /******/
            decline: function(dep) {
                /******/
                if (void 0 === dep) /******/
                hot._selfDeclined = !0; else if ("object" == typeof dep) /******/
                for (var i = 0; i < dep.length; i++) /******/
                hot._declinedDependencies[dep[i]] = !0; else /******/
                hot._declinedDependencies[dep] = !0;
            },
            /******/
            dispose: function(callback) {
                /******/
                hot._disposeHandlers.push(callback);
            },
            /******/
            addDisposeHandler: function(callback) {
                /******/
                hot._disposeHandlers.push(callback);
            },
            /******/
            removeDisposeHandler: function(callback) {
                /******/
                var idx = hot._disposeHandlers.indexOf(callback);
                /******/
                idx >= 0 && hot._disposeHandlers.splice(idx, 1);
            },
            /******/
            /******/
            // Management API
            /******/
            check: hotCheck,
            /******/
            apply: hotApply,
            /******/
            status: function(l) {
                /******/
                if (!l) return hotStatus;
                /******/
                hotStatusHandlers.push(l);
            },
            /******/
            addStatusHandler: function(l) {
                /******/
                hotStatusHandlers.push(l);
            },
            /******/
            removeStatusHandler: function(l) {
                /******/
                var idx = hotStatusHandlers.indexOf(l);
                /******/
                idx >= 0 && hotStatusHandlers.splice(idx, 1);
            },
            /******/
            /******/
            //inherit from previous dispose call
            /******/
            data: hotCurrentModuleData[moduleId]
        };
        /******/
        /******/
        return hotCurrentChildModule = void 0, hot;
    }
    /******/
    /******/
    function hotSetStatus(newStatus) {
        /******/
        hotStatus = newStatus;
        /******/
        for (var i = 0; i < hotStatusHandlers.length; i++) /******/
        hotStatusHandlers[i].call(null, newStatus);
    }
    /******/
    /******/
    function toModuleId(id) {
        /******/
        return +id + "" === id ? +id : id;
    }
    /******/
    /******/
    function hotCheck(apply) {
        /******/
        if ("idle" !== hotStatus) throw new Error("check() is only allowed in idle status");
        /******/
        /******/
        /******/
        return hotApplyOnUpdate = apply, hotSetStatus("check"), hotDownloadManifest(hotRequestTimeout).then(function(update) {
            /******/
            if (!update) /******/
            /******/
            return hotSetStatus("idle"), null;
            /******/
            hotRequestedFilesMap = {}, /******/
            hotWaitingFilesMap = {}, /******/
            hotAvailableFilesMap = update.c, /******/
            hotUpdateNewHash = update.h, /******/
            /******/
            hotSetStatus("prepare");
            /******/
            var promise = new Promise(function(resolve, reject) {
                /******/
                hotDeferred = {
                    /******/
                    resolve: resolve,
                    /******/
                    reject: reject
                };
            });
            /******/
            hotUpdate = {};
            /******/
            var chunkId = 0;
            /******/
            // eslint-disable-line no-lone-blocks
            /******/
            /*globals chunkId */
            /******/
            /******/
            /******/
            return hotEnsureUpdateChunk(0), "prepare" === hotStatus && 0 === hotChunksLoading && 0 === hotWaitingFiles && hotUpdateDownloaded(), 
            promise;
        });
    }
    /******/
    /******/
    function hotAddUpdateChunk(chunkId, moreModules) {
        // eslint-disable-line no-unused-vars
        /******/
        if (hotAvailableFilesMap[chunkId] && hotRequestedFilesMap[chunkId]) {
            /******/
            hotRequestedFilesMap[chunkId] = !1;
            /******/
            for (var moduleId in moreModules) /******/
            Object.prototype.hasOwnProperty.call(moreModules, moduleId) && (/******/
            hotUpdate[moduleId] = moreModules[moduleId]);
            /******/
            0 == --hotWaitingFiles && 0 === hotChunksLoading && /******/
            hotUpdateDownloaded();
        }
    }
    /******/
    /******/
    function hotEnsureUpdateChunk(chunkId) {
        /******/
        hotAvailableFilesMap[chunkId] ? (/******/
        hotRequestedFilesMap[chunkId] = !0, /******/
        hotWaitingFiles++, /******/
        hotDownloadUpdateChunk(chunkId)) : /******/
        hotWaitingFilesMap[chunkId] = !0;
    }
    /******/
    /******/
    function hotUpdateDownloaded() {
        /******/
        hotSetStatus("ready");
        /******/
        var deferred = hotDeferred;
        /******/
        if (/******/
        hotDeferred = null, deferred) /******/
        if (hotApplyOnUpdate) /******/
        // Wrap deferred object in Promise to mark it as a well-handled Promise to
        /******/
        // avoid triggering uncaught exception warning in Chrome.
        /******/
        // See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
        /******/
        Promise.resolve().then(function() {
            /******/
            return hotApply(hotApplyOnUpdate);
        }).then(/******/
        function(result) {
            /******/
            deferred.resolve(result);
        }, /******/
        function(err) {
            /******/
            deferred.reject(err);
        }); else {
            /******/
            var outdatedModules = [];
            /******/
            for (var id in hotUpdate) /******/
            Object.prototype.hasOwnProperty.call(hotUpdate, id) && /******/
            outdatedModules.push(toModuleId(id));
            /******/
            deferred.resolve(outdatedModules);
        }
    }
    /******/
    /******/
    function hotApply(options) {
        /******/
        /******/
        function getAffectedStuff(updateModuleId) {
            /******/
            for (/******/
            var outdatedModules = [ updateModuleId ], outdatedDependencies = {}, queue = outdatedModules.slice().map(function(id) {
                /******/
                return {
                    /******/
                    chain: [ id ],
                    /******/
                    id: id
                };
            }); queue.length > 0; ) {
                /******/
                var queueItem = queue.pop(), moduleId = queueItem.id, chain = queueItem.chain;
                /******/
                if ((/******/
                module = installedModules[moduleId]) && !module.hot._selfAccepted) {
                    /******/
                    if (module.hot._selfDeclined) /******/
                    return {
                        /******/
                        type: "self-declined",
                        /******/
                        chain: chain,
                        /******/
                        moduleId: moduleId
                    };
                    /******/
                    if (module.hot._main) /******/
                    return {
                        /******/
                        type: "unaccepted",
                        /******/
                        chain: chain,
                        /******/
                        moduleId: moduleId
                    };
                    /******/
                    for (var i = 0; i < module.parents.length; i++) {
                        /******/
                        var parentId = module.parents[i], parent = installedModules[parentId];
                        /******/
                        if (parent) {
                            /******/
                            if (parent.hot._declinedDependencies[moduleId]) /******/
                            return {
                                /******/
                                type: "declined",
                                /******/
                                chain: chain.concat([ parentId ]),
                                /******/
                                moduleId: moduleId,
                                /******/
                                parentId: parentId
                            };
                            /******/
                            outdatedModules.indexOf(parentId) >= 0 || (/******/
                            parent.hot._acceptedDependencies[moduleId] ? (/******/
                            outdatedDependencies[parentId] || (/******/
                            outdatedDependencies[parentId] = []), /******/
                            addAllToSet(outdatedDependencies[parentId], [ moduleId ])) : (/******/
                            delete outdatedDependencies[parentId], /******/
                            outdatedModules.push(parentId), /******/
                            queue.push({
                                /******/
                                chain: chain.concat([ parentId ]),
                                /******/
                                id: parentId
                            })));
                        }
                    }
                }
            }
            /******/
            /******/
            return {
                /******/
                type: "accepted",
                /******/
                moduleId: updateModuleId,
                /******/
                outdatedModules: outdatedModules,
                /******/
                outdatedDependencies: outdatedDependencies
            };
        }
        /******/
        /******/
        function addAllToSet(a, b) {
            /******/
            for (var i = 0; i < b.length; i++) {
                /******/
                var item = b[i];
                /******/
                a.indexOf(item) < 0 && /******/
                a.push(item);
            }
        }
        /******/
        if ("ready" !== hotStatus) throw new Error("apply() is only allowed in ready status");
        /******/
        options = options || {};
        /******/
        /******/
        var cb, i, j, module, moduleId, outdatedDependencies = {}, outdatedModules = [], appliedUpdate = {}, warnUnexpectedRequire = function warnUnexpectedRequire() {
            /******/
            console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
        };
        /******/
        /******/
        for (var id in hotUpdate) /******/
        if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
            /******/
            moduleId = toModuleId(id);
            /******/
            var result;
            /******/
            /******/
            result = hotUpdate[id] ? getAffectedStuff(moduleId) : {
                /******/
                type: "disposed",
                /******/
                moduleId: id
            };
            /******/
            var abortError = !1, doApply = !1, doDispose = !1, chainInfo = "";
            /******/
            switch (/******/
            result.chain && (/******/
            chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ")), result.type) {
              /******/
                case "self-declined":
                /******/
                options.onDeclined && /******/
                options.onDeclined(result), /******/
                options.ignoreDeclined || (/******/
                abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo));
                /******/
                break;

              /******/
                case "declined":
                /******/
                options.onDeclined && /******/
                options.onDeclined(result), /******/
                options.ignoreDeclined || (/******/
                abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo));
                /******/
                break;

              /******/
                case "unaccepted":
                /******/
                options.onUnaccepted && /******/
                options.onUnaccepted(result), /******/
                options.ignoreUnaccepted || (/******/
                abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo));
                /******/
                break;

              /******/
                case "accepted":
                /******/
                options.onAccepted && /******/
                options.onAccepted(result), /******/
                doApply = !0;
                /******/
                break;

              /******/
                case "disposed":
                /******/
                options.onDisposed && /******/
                options.onDisposed(result), /******/
                doDispose = !0;
                /******/
                break;

              /******/
                default:
                /******/
                throw new Error("Unexception type " + result.type);
            }
            /******/
            if (abortError) /******/
            /******/
            return hotSetStatus("abort"), Promise.reject(abortError);
            /******/
            if (doApply) {
                /******/
                appliedUpdate[moduleId] = hotUpdate[moduleId], /******/
                addAllToSet(outdatedModules, result.outdatedModules);
                /******/
                for (moduleId in result.outdatedDependencies) /******/
                Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId) && (/******/
                outdatedDependencies[moduleId] || (/******/
                outdatedDependencies[moduleId] = []), /******/
                addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]));
            }
            /******/
            doDispose && (/******/
            addAllToSet(outdatedModules, [ result.moduleId ]), /******/
            appliedUpdate[moduleId] = warnUnexpectedRequire);
        }
        /******/
        /******/
        // Store self accepted outdated modules to require them later by the module system
        /******/
        var outdatedSelfAcceptedModules = [];
        /******/
        for (i = 0; i < outdatedModules.length; i++) /******/
        moduleId = outdatedModules[i], /******/
        installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted && /******/
        outdatedSelfAcceptedModules.push({
            /******/
            module: moduleId,
            /******/
            errorHandler: installedModules[moduleId].hot._selfAccepted
        });
        /******/
        /******/
        // Now in "dispose" phase
        /******/
        hotSetStatus("dispose"), /******/
        Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
            /******/
            !1 === hotAvailableFilesMap[chunkId] && /******/
            hotDisposeChunk(chunkId);
        });
        /******/
        for (/******/
        /******/
        var idx, queue = outdatedModules.slice(); queue.length > 0; ) /******/
        if (/******/
        moduleId = queue.pop(), /******/
        module = installedModules[moduleId]) {
            /******/
            /******/
            var data = {}, disposeHandlers = module.hot._disposeHandlers;
            /******/
            for (j = 0; j < disposeHandlers.length; j++) /******/
            /******/
            (cb = disposeHandlers[j])(data);
            /******/
            /******/
            // remove "parents" references from all children
            /******/
            for (/******/
            hotCurrentModuleData[moduleId] = data, /******/
            /******/
            // disable module (this disables requires from this module)
            /******/
            module.hot.active = !1, /******/
            /******/
            // remove module from cache
            /******/
            delete installedModules[moduleId], /******/
            /******/
            // when disposing there is no need to call dispose handler
            /******/
            delete outdatedDependencies[moduleId], j = 0; j < module.children.length; j++) {
                /******/
                var child = installedModules[module.children[j]];
                /******/
                child && (/******/
                (/******/
                idx = child.parents.indexOf(moduleId)) >= 0 && /******/
                child.parents.splice(idx, 1));
            }
        }
        /******/
        /******/
        // remove outdated dependency from module children
        /******/
        var dependency, moduleOutdatedDependencies;
        /******/
        for (moduleId in outdatedDependencies) /******/
        if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId) && (/******/
        module = installedModules[moduleId])) /******/
        for (/******/
        moduleOutdatedDependencies = outdatedDependencies[moduleId], j = 0; j < moduleOutdatedDependencies.length; j++) /******/
        dependency = moduleOutdatedDependencies[j], /******/
        (/******/
        idx = module.children.indexOf(dependency)) >= 0 && module.children.splice(idx, 1);
        /******/
        /******/
        // Not in "apply" phase
        /******/
        hotSetStatus("apply"), /******/
        /******/
        hotCurrentHash = hotUpdateNewHash;
        /******/
        /******/
        // insert new code
        /******/
        for (moduleId in appliedUpdate) /******/
        Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId) && (/******/
        modules[moduleId] = appliedUpdate[moduleId]);
        /******/
        /******/
        // call accept handlers
        /******/
        var error = null;
        /******/
        for (moduleId in outdatedDependencies) /******/
        if (Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId) && (/******/
        module = installedModules[moduleId])) {
            /******/
            moduleOutdatedDependencies = outdatedDependencies[moduleId];
            /******/
            var callbacks = [];
            /******/
            for (i = 0; i < moduleOutdatedDependencies.length; i++) /******/
            if (/******/
            dependency = moduleOutdatedDependencies[i], /******/
            cb = module.hot._acceptedDependencies[dependency]) {
                /******/
                if (callbacks.indexOf(cb) >= 0) continue;
                /******/
                callbacks.push(cb);
            }
            /******/
            for (i = 0; i < callbacks.length; i++) {
                /******/
                cb = callbacks[i];
                /******/
                try {
                    /******/
                    cb(moduleOutdatedDependencies);
                } catch (err) {
                    /******/
                    options.onErrored && /******/
                    options.onErrored({
                        /******/
                        type: "accept-errored",
                        /******/
                        moduleId: moduleId,
                        /******/
                        dependencyId: moduleOutdatedDependencies[i],
                        /******/
                        error: err
                    }), /******/
                    options.ignoreErrored || error || (/******/
                    error = err);
                }
            }
        }
        /******/
        /******/
        // Load self accepted modules
        /******/
        for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
            /******/
            var item = outdatedSelfAcceptedModules[i];
            /******/
            moduleId = item.module, /******/
            hotCurrentParents = [ moduleId ];
            /******/
            try {
                /******/
                __webpack_require__(moduleId);
            } catch (err) {
                /******/
                if ("function" == typeof item.errorHandler) /******/
                try {
                    /******/
                    item.errorHandler(err);
                } catch (err2) {
                    /******/
                    options.onErrored && /******/
                    options.onErrored({
                        /******/
                        type: "self-accept-error-handler-errored",
                        /******/
                        moduleId: moduleId,
                        /******/
                        error: err2,
                        /******/
                        orginalError: err,
                        // TODO remove in webpack 4
                        /******/
                        originalError: err
                    }), /******/
                    options.ignoreErrored || error || (/******/
                    error = err2), /******/
                    error || (/******/
                    error = err);
                } else /******/
                options.onErrored && /******/
                options.onErrored({
                    /******/
                    type: "self-accept-errored",
                    /******/
                    moduleId: moduleId,
                    /******/
                    error: err
                }), /******/
                options.ignoreErrored || error || (/******/
                error = err);
            }
        }
        /******/
        /******/
        // handle errors in accept handlers and self accepted module load
        /******/
        /******/
        /******/
        // handle errors in accept handlers and self accepted module load
        /******/
        /******/
        /******/
        /******/
        return error ? (hotSetStatus("fail"), Promise.reject(error)) : (hotSetStatus("idle"), 
        new Promise(function(resolve) {
            /******/
            resolve(outdatedModules);
        }));
    }
    /******/
    /******/
    // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/
        // Check if module is in cache
        /******/
        if (installedModules[moduleId]) /******/
        return installedModules[moduleId].exports;
        /******/
        // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: !1,
            /******/
            exports: {},
            /******/
            hot: hotCreateModule(moduleId),
            /******/
            parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
            /******/
            children: []
        };
        /******/
        /******/
        // Return the exports of the module
        /******/
        /******/
        /******/
        // Execute the module function
        /******/
        /******/
        /******/
        // Flag the module as loaded
        /******/
        return modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId)), 
        module.l = !0, module.exports;
    }
    /******/
    var parentHotUpdateCallback = window.webpackHotUpdate;
    /******/
    window.webpackHotUpdate = /******/
    function webpackHotUpdateCallback(chunkId, moreModules) {
        // eslint-disable-line no-unused-vars
        /******/
        hotAddUpdateChunk(chunkId, moreModules), /******/
        parentHotUpdateCallback && parentHotUpdateCallback(chunkId, moreModules);
    };
    /******/
    /******/
    /******/
    /******/
    var hotApplyOnUpdate = !0, hotCurrentHash = "0504446e8d690819b76a", hotRequestTimeout = 1e4, hotCurrentModuleData = {}, hotCurrentChildModule, hotCurrentParents = [], hotCurrentParentsTemp = [], hotStatusHandlers = [], hotStatus = "idle", hotWaitingFiles = 0, hotChunksLoading = 0, hotWaitingFilesMap = {}, hotRequestedFilesMap = {}, hotAvailableFilesMap = {}, hotDeferred, hotUpdate, hotUpdateNewHash, installedModules = {};
    /******/
    /******/
    // Load entry module and return exports
    /******/
    /******/
    /******/
    /******/
    // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules, /******/
    /******/
    // expose the module cache
    /******/
    __webpack_require__.c = installedModules, /******/
    /******/
    // define getter function for harmony exports
    /******/
    __webpack_require__.d = function(exports, name, getter) {
        /******/
        __webpack_require__.o(exports, name) || /******/
        Object.defineProperty(exports, name, {
            /******/
            configurable: !1,
            /******/
            enumerable: !0,
            /******/
            get: getter
        });
    }, /******/
    /******/
    // getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function(module) {
        /******/
        var getter = module && module.__esModule ? /******/
        function getDefault() {
            return module.default;
        } : /******/
        function getModuleExports() {
            return module;
        };
        /******/
        /******/
        return __webpack_require__.d(getter, "a", getter), getter;
    }, /******/
    /******/
    // Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, /******/
    /******/
    // __webpack_public_path__
    /******/
    __webpack_require__.p = "", /******/
    /******/
    // __webpack_hash__
    /******/
    __webpack_require__.h = function() {
        return hotCurrentHash;
    }, hotCreateRequire(0)(__webpack_require__.s = 0);
}([ /* 0 */
/***/
function(module, exports, __webpack_require__) {
    module.exports = __webpack_require__(1);
}, /* 1 */
/***/
function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_util__ = __webpack_require__(2);\n\n\n(function ($) {\n  'use strict';\n\n  Object(__WEBPACK_IMPORTED_MODULE_0__utils_util__[\"a\" /* namespace */])('nc');\n\n  window.nc.hello = function () {\n    window.alert('hello world');\n  };\n\n  /*\r\n   * implement\r\n   */\n  $(document).ready(init);\n\n  function init() {\n    window.nc.hello();\n  }\n})(jQuery);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9fc3JjL2luZGV4LmpzP2M5ZTkiXSwibmFtZXMiOlsiJCIsIm5hbWVzcGFjZSIsIndpbmRvdyIsIm5jIiwiaGVsbG8iLCJhbGVydCIsImRvY3VtZW50IiwicmVhZHkiLCJpbml0IiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOztBQUFBOztBQUVDLFdBQVVBLENBQVYsRUFBYTtBQUNaOztBQUVBQyxFQUFBLHNFQUFBQSxDQUFVLElBQVY7O0FBRUFDLFNBQU9DLEVBQVAsQ0FBVUMsS0FBVixHQUFrQixZQUFXO0FBQzNCRixXQUFPRyxLQUFQLENBQWEsYUFBYjtBQUNELEdBRkQ7O0FBSUE7OztBQUdBTCxJQUFFTSxRQUFGLEVBQVlDLEtBQVosQ0FBa0JDLElBQWxCOztBQUVBLFdBQVNBLElBQVQsR0FBZ0I7QUFDZE4sV0FBT0MsRUFBUCxDQUFVQyxLQUFWO0FBQ0Q7QUFDRixDQWpCQSxFQWlCQ0ssTUFqQkQsQ0FBRCIsImZpbGUiOiIxLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtuYW1lc3BhY2V9IGZyb20gJy4vdXRpbHMvdXRpbCc7XHJcblxyXG4oZnVuY3Rpb24gKCQpIHtcclxuICAndXNlIHN0cmljdCc7XHJcblxyXG4gIG5hbWVzcGFjZSgnbmMnKTtcclxuXHJcbiAgd2luZG93Lm5jLmhlbGxvID0gZnVuY3Rpb24oKSB7XHJcbiAgICB3aW5kb3cuYWxlcnQoJ2hlbGxvIHdvcmxkJyk7XHJcbiAgfTtcclxuXHJcbiAgLypcclxuICAgKiBpbXBsZW1lbnRcclxuICAgKi9cclxuICAkKGRvY3VtZW50KS5yZWFkeShpbml0KTtcclxuXHJcbiAgZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHdpbmRvdy5uYy5oZWxsbygpO1xyXG4gIH1cclxufShqUXVlcnkpKTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9fc3JjL2luZGV4LmpzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///1\n");
}, /* 2 */
/***/
function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    eval("/* unused harmony export not */\n/* unused harmony export isDefined */\n/* unused harmony export isNotDef */\n/* unused harmony export isString */\n/* unused harmony export isObject */\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"a\", function() { return namespace; });\nvar not = function not(func) {\n  return function (object) {\n    return !func(object);\n  };\n};\n\nvar isDefined = function isDefined(obj) {\n  if (obj === null || typeof obj === 'undefined') return false;\n\n  return true;\n};\n\nvar isNotDef = not(isDefined);\n\nvar isString = function isString(obj) {\n  if (isNotDef(obj)) return false;\n\n  return obj.constructor === String;\n};\n\nvar isObject = function isObject(obj) {\n  if (isNotDef(obj)) return false;\n\n  return obj.constructor === Object;\n};\n\nvar namespace = function namespace(_namespace, parent) {\n  if (!isString(_namespace)) throw new TypeError('namespace parameter type of aid.namespace() must be String.');\n\n  if (!(isObject(parent) || !isDefined(parent))) {\n    throw new TypeError('parent parameter type of aid.namespace() must be Object or null or undefined.');\n  }\n\n  var ns = parent || window;\n  if (_namespace) {\n    var parts = _namespace.split('.');\n    for (var i = 0, max = parts.length; i < max; i++) {\n      if (!ns[parts[i]]) ns[parts[i]] = {};\n      ns = ns[parts[i]];\n    }\n  }\n\n  return ns;\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9fc3JjL3V0aWxzL3V0aWwuanM/MGY4NiJdLCJuYW1lcyI6WyJub3QiLCJmdW5jIiwib2JqZWN0IiwiaXNEZWZpbmVkIiwib2JqIiwiaXNOb3REZWYiLCJpc1N0cmluZyIsImNvbnN0cnVjdG9yIiwiU3RyaW5nIiwiaXNPYmplY3QiLCJPYmplY3QiLCJuYW1lc3BhY2UiLCJwYXJlbnQiLCJUeXBlRXJyb3IiLCJucyIsIndpbmRvdyIsInBhcnRzIiwic3BsaXQiLCJpIiwibWF4IiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBTyxJQUFNQSxNQUFNLFNBQU5BLEdBQU0sQ0FBQ0MsSUFBRCxFQUFVO0FBQzNCLFNBQU8sVUFBQ0MsTUFBRCxFQUFZO0FBQ2pCLFdBQU8sQ0FBQ0QsS0FBS0MsTUFBTCxDQUFSO0FBQ0QsR0FGRDtBQUdELENBSk07O0FBTUEsSUFBTUMsWUFBWSxTQUFaQSxTQUFZLENBQUNDLEdBQUQsRUFBUztBQUNoQyxNQUFJQSxRQUFRLElBQVIsSUFBZ0IsT0FBT0EsR0FBUCxLQUFlLFdBQW5DLEVBQWdELE9BQU8sS0FBUDs7QUFFaEQsU0FBTyxJQUFQO0FBQ0QsQ0FKTTs7QUFNQSxJQUFNQyxXQUFXTCxJQUFJRyxTQUFKLENBQWpCOztBQUVBLElBQU1HLFdBQVcsU0FBWEEsUUFBVyxDQUFDRixHQUFELEVBQVM7QUFDL0IsTUFBSUMsU0FBU0QsR0FBVCxDQUFKLEVBQW1CLE9BQU8sS0FBUDs7QUFFbkIsU0FBUUEsSUFBSUcsV0FBSixLQUFvQkMsTUFBNUI7QUFDRCxDQUpNOztBQU1BLElBQU1DLFdBQVcsU0FBWEEsUUFBVyxDQUFDTCxHQUFELEVBQVM7QUFDL0IsTUFBSUMsU0FBU0QsR0FBVCxDQUFKLEVBQW1CLE9BQU8sS0FBUDs7QUFFbkIsU0FBUUEsSUFBSUcsV0FBSixLQUFvQkcsTUFBNUI7QUFDRCxDQUpNOztBQU1BLElBQU1DLFlBQVksbUJBQVVBLFVBQVYsRUFBcUJDLE1BQXJCLEVBQTZCO0FBQ3BELE1BQUksQ0FBQ04sU0FBU0ssVUFBVCxDQUFMLEVBQTBCLE1BQU0sSUFBSUUsU0FBSixDQUFjLDZEQUFkLENBQU47O0FBRTFCLE1BQUksRUFBRUosU0FBU0csTUFBVCxLQUFvQixDQUFDVCxVQUFVUyxNQUFWLENBQXZCLENBQUosRUFBK0M7QUFDN0MsVUFBTSxJQUFJQyxTQUFKLENBQWMsK0VBQWQsQ0FBTjtBQUNEOztBQUVELE1BQUlDLEtBQUtGLFVBQVVHLE1BQW5CO0FBQ0EsTUFBSUosVUFBSixFQUFlO0FBQ2IsUUFBSUssUUFBUUwsV0FBVU0sS0FBVixDQUFnQixHQUFoQixDQUFaO0FBQ0EsU0FBSyxJQUFJQyxJQUFJLENBQVIsRUFBV0MsTUFBTUgsTUFBTUksTUFBNUIsRUFBb0NGLElBQUlDLEdBQXhDLEVBQTZDRCxHQUE3QyxFQUFrRDtBQUNoRCxVQUFJLENBQUNKLEdBQUdFLE1BQU1FLENBQU4sQ0FBSCxDQUFMLEVBQW1CSixHQUFHRSxNQUFNRSxDQUFOLENBQUgsSUFBZSxFQUFmO0FBQ25CSixXQUFLQSxHQUFHRSxNQUFNRSxDQUFOLENBQUgsQ0FBTDtBQUNEO0FBQ0Y7O0FBRUQsU0FBT0osRUFBUDtBQUNELENBakJNIiwiZmlsZSI6IjIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY29uc3Qgbm90ID0gKGZ1bmMpID0+IHtcclxuICByZXR1cm4gKG9iamVjdCkgPT4ge1xyXG4gICAgcmV0dXJuICFmdW5jKG9iamVjdCk7XHJcbiAgfTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc0RlZmluZWQgPSAob2JqKSA9PiB7XHJcbiAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykgcmV0dXJuIGZhbHNlO1xyXG5cclxuICByZXR1cm4gdHJ1ZTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBpc05vdERlZiA9IG5vdChpc0RlZmluZWQpO1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzU3RyaW5nID0gKG9iaikgPT4ge1xyXG4gIGlmIChpc05vdERlZihvYmopKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHJldHVybiAob2JqLmNvbnN0cnVjdG9yID09PSBTdHJpbmcpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IGlzT2JqZWN0ID0gKG9iaikgPT4ge1xyXG4gIGlmIChpc05vdERlZihvYmopKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gIHJldHVybiAob2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3QpO1xyXG59O1xyXG5cclxuZXhwb3J0IGNvbnN0IG5hbWVzcGFjZSA9IGZ1bmN0aW9uIChuYW1lc3BhY2UsIHBhcmVudCkge1xyXG4gIGlmICghaXNTdHJpbmcobmFtZXNwYWNlKSkgdGhyb3cgbmV3IFR5cGVFcnJvcignbmFtZXNwYWNlIHBhcmFtZXRlciB0eXBlIG9mIGFpZC5uYW1lc3BhY2UoKSBtdXN0IGJlIFN0cmluZy4nKTtcclxuXHJcbiAgaWYgKCEoaXNPYmplY3QocGFyZW50KSB8fCAhaXNEZWZpbmVkKHBhcmVudCkpKSB7XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdwYXJlbnQgcGFyYW1ldGVyIHR5cGUgb2YgYWlkLm5hbWVzcGFjZSgpIG11c3QgYmUgT2JqZWN0IG9yIG51bGwgb3IgdW5kZWZpbmVkLicpO1xyXG4gIH1cclxuXHJcbiAgbGV0IG5zID0gcGFyZW50IHx8IHdpbmRvdztcclxuICBpZiAobmFtZXNwYWNlKSB7XHJcbiAgICBsZXQgcGFydHMgPSBuYW1lc3BhY2Uuc3BsaXQoJy4nKTtcclxuICAgIGZvciAobGV0IGkgPSAwLCBtYXggPSBwYXJ0cy5sZW5ndGg7IGkgPCBtYXg7IGkrKykge1xyXG4gICAgICBpZiAoIW5zW3BhcnRzW2ldXSkgbnNbcGFydHNbaV1dID0ge307XHJcbiAgICAgIG5zID0gbnNbcGFydHNbaV1dO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIG5zO1xyXG59O1xuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL19zcmMvdXRpbHMvdXRpbC5qcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///2\n");
} ]);