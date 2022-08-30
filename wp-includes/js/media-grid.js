(function(){var __webpack_modules__=({5817:(function(module){var l10n=wp.media.view.l10n,EditAttachmentMetadata;EditAttachmentMetadata=wp.media.controller.State.extend({defaults:{id:'edit-attachment',title:l10n.attachmentDetails,content:'edit-metadata',menu:false,toolbar:false,router:false}});module.exports=EditAttachmentMetadata;}),9525:(function(module){var Router=Backbone.Router.extend({routes:{'upload.php?item=:slug&mode=edit':'editItem','upload.php?item=:slug':'showItem','upload.php?search=:query':'search','upload.php':'reset'},baseUrl:function(url){return 'upload.php'+url;},reset:function(){var frame=wp.media.frames.edit;if(frame){frame.close();}},search:function(query){jQuery('#media-search-input').val(query).trigger('input');},showItem:function(query){var media=wp.media,frame=media.frames.browse,library=frame.state().get('library'),item;item=library.findWhere({id:parseInt(query,10)});if(item){item.set('skipHistory',true);frame.trigger('edit:attachment',item);}else{item=media.attachment(query);frame.listenTo(item,'change',function(model){frame.stopListening(item);frame.trigger('edit:attachment',model);});item.fetch();}},editItem:function(query){this.showItem(query);wp.media.frames.edit.content.mode('edit-details');}});module.exports=Router;}),7433:(function(module){var Details=wp.media.view.Attachment.Details,TwoColumn;TwoColumn=Details.extend({template:wp.template('attachment-details-two-column'),initialize:function(){this.controller.on('content:activate:edit-details',_.bind(this.editAttachment,this));Details.prototype.initialize.apply(this,arguments);},editAttachment:function(event){if(event){event.preventDefault();}
this.controller.content.mode('edit-image');},toggleSelectionHandler:function(){}});module.exports=TwoColumn;}),5562:(function(module){var Button=wp.media.view.Button,DeleteSelected=wp.media.view.DeleteSelectedButton,DeleteSelectedPermanently;DeleteSelectedPermanently=DeleteSelected.extend({initialize:function(){DeleteSelected.prototype.initialize.apply(this,arguments);this.controller.on('select:activate',this.selectActivate,this);this.controller.on('select:deactivate',this.selectDeactivate,this);},filterChange:function(model){this.canShow=('trash'===model.get('status'));},selectActivate:function(){this.toggleDisabled();this.$el.toggleClass('hidden',!this.canShow);},selectDeactivate:function(){this.toggleDisabled();this.$el.addClass('hidden');},render:function(){Button.prototype.render.apply(this,arguments);this.selectActivate();return this;}});module.exports=DeleteSelectedPermanently;}),471:(function(module){var Button=wp.media.view.Button,l10n=wp.media.view.l10n,DeleteSelected;DeleteSelected=Button.extend({initialize:function(){Button.prototype.initialize.apply(this,arguments);if(this.options.filters){this.options.filters.model.on('change',this.filterChange,this);}
this.controller.on('selection:toggle',this.toggleDisabled,this);this.controller.on('select:activate',this.toggleDisabled,this);},filterChange:function(model){if('trash'===model.get('status')){this.model.set('text',l10n.restoreSelected);}else if(wp.media.view.settings.mediaTrash){this.model.set('text',l10n.trashSelected);}else{this.model.set('text',l10n.deletePermanently);}},toggleDisabled:function(){this.model.set('disabled',!this.controller.state().get('selection').length);},render:function(){Button.prototype.render.apply(this,arguments);if(this.controller.isModeActive('select')){this.$el.addClass('delete-selected-button');}else{this.$el.addClass('delete-selected-button hidden');}
this.toggleDisabled();return this;}});module.exports=DeleteSelected;}),6767:(function(module){var Button=wp.media.view.Button,l10n=wp.media.view.l10n,SelectModeToggle;SelectModeToggle=Button.extend({initialize:function(){_.defaults(this.options,{size:''});Button.prototype.initialize.apply(this,arguments);this.controller.on('select:activate select:deactivate',this.toggleBulkEditHandler,this);this.controller.on('selection:action:done',this.back,this);},back:function(){this.controller.deactivateMode('select').activateMode('edit');},click:function(){Button.prototype.click.apply(this,arguments);if(this.controller.isModeActive('select')){this.back();}else{this.controller.deactivateMode('edit').activateMode('select');}},render:function(){Button.prototype.render.apply(this,arguments);this.$el.addClass('select-mode-toggle-button');return this;},toggleBulkEditHandler:function(){var toolbar=this.controller.content.get().toolbar,children;children=toolbar.$('.media-toolbar-secondary > *, .media-toolbar-primary > *');if(this.controller.isModeActive('select')){this.model.set({size:'large',text:l10n.cancel});children.not('.spinner, .media-button').hide();this.$el.show();toolbar.$el.addClass('media-toolbar-mode-select');toolbar.$('.delete-selected-button').removeClass('hidden');}else{this.model.set({size:'',text:l10n.bulkSelect});this.controller.content.get().$el.removeClass('fixed');toolbar.$el.css('width','');toolbar.$el.removeClass('media-toolbar-mode-select');toolbar.$('.delete-selected-button').addClass('hidden');children.not('.media-button').show();this.controller.state().get('selection').reset();}}});module.exports=SelectModeToggle;}),9157:(function(module){var View=wp.media.View,EditImage=wp.media.view.EditImage,Details;Details=EditImage.extend({initialize:function(options){this.editor=window.imageEdit;this.frame=options.frame;this.controller=options.controller;View.prototype.initialize.apply(this,arguments);},back:function(){this.frame.content.mode('edit-metadata');},save:function(){this.model.fetch().done(_.bind(function(){this.frame.content.mode('edit-metadata');},this));}});module.exports=Details;}),5169:(function(module){var Frame=wp.media.view.Frame,MediaFrame=wp.media.view.MediaFrame,$=jQuery,EditAttachments;EditAttachments=MediaFrame.extend({className:'edit-attachment-frame',template:wp.template('edit-attachment-frame'),regions:['title','content'],events:{'click .left':'previousMediaItem','click .right':'nextMediaItem'},initialize:function(){Frame.prototype.initialize.apply(this,arguments);_.defaults(this.options,{modal:true,state:'edit-attachment'});this.controller=this.options.controller;this.gridRouter=this.controller.gridRouter;this.library=this.options.library;if(this.options.model){this.model=this.options.model;}
this.bindHandlers();this.createStates();this.createModal();this.title.mode('default');this.toggleNav();},bindHandlers:function(){this.on('title:create:default',this.createTitle,this);this.on('content:create:edit-metadata',this.editMetadataMode,this);this.on('content:create:edit-image',this.editImageMode,this);this.on('content:render:edit-image',this.editImageModeRender,this);this.on('refresh',this.rerender,this);this.on('close',this.detach);this.bindModelHandlers();this.listenTo(this.gridRouter,'route:search',this.close,this);},bindModelHandlers:function(){this.listenTo(this.model,'change:status destroy',this.close,this);},createModal:function(){if(this.options.modal){this.modal=new wp.media.view.Modal({controller:this,title:this.options.title,hasCloseButton:false});this.modal.on('open',_.bind(function(){$('body').on('keydown.media-modal',_.bind(this.keyEvent,this));},this));this.modal.on('close',_.bind(function(){$('body').off('keydown.media-modal');$('li.attachment[data-id="'+this.model.get('id')+'"]').trigger('focus');this.resetRoute();},this));this.modal.content(this);this.modal.open();}},createStates:function(){this.states.add([new wp.media.controller.EditAttachmentMetadata({model:this.model,library:this.library})]);},editMetadataMode:function(contentRegion){contentRegion.view=new wp.media.view.Attachment.Details.TwoColumn({controller:this,model:this.model});contentRegion.view.views.set('.attachment-compat',new wp.media.view.AttachmentCompat({controller:this,model:this.model}));if(this.model&&!this.model.get('skipHistory')){this.gridRouter.navigate(this.gridRouter.baseUrl('?item='+this.model.id));}},editImageMode:function(contentRegion){var editImageController=new wp.media.controller.EditImage({model:this.model,frame:this});editImageController._toolbar=function(){};editImageController._router=function(){};editImageController._menu=function(){};contentRegion.view=new wp.media.view.EditImage.Details({model:this.model,frame:this,controller:editImageController});this.gridRouter.navigate(this.gridRouter.baseUrl('?item='+this.model.id+'&mode=edit'));},editImageModeRender:function(view){view.on('ready',view.loadEditor);},toggleNav:function(){this.$('.left').prop('disabled',!this.hasPrevious());this.$('.right').prop('disabled',!this.hasNext());},rerender:function(model){this.stopListening(this.model);this.model=model;this.bindModelHandlers();if(this.content.mode()!=='edit-metadata'){this.content.mode('edit-metadata');}else{this.content.render();}
this.toggleNav();},previousMediaItem:function(){if(!this.hasPrevious()){return;}
this.trigger('refresh',this.library.at(this.getCurrentIndex()-1));this.focusNavButton(this.hasPrevious()?'.left':'.right');},nextMediaItem:function(){if(!this.hasNext()){return;}
this.trigger('refresh',this.library.at(this.getCurrentIndex()+1));this.focusNavButton(this.hasNext()?'.right':'.left');},focusNavButton:function(which){$(which).trigger('focus');},getCurrentIndex:function(){return this.library.indexOf(this.model);},hasNext:function(){return(this.getCurrentIndex()+1)<this.library.length;},hasPrevious:function(){return(this.getCurrentIndex()-1)>-1;},keyEvent:function(event){if(('INPUT'===event.target.nodeName||'TEXTAREA'===event.target.nodeName)&&!event.target.disabled){return;}
if(39===event.keyCode){this.nextMediaItem();}
if(37===event.keyCode){this.previousMediaItem();}},resetRoute:function(){var searchTerm=this.controller.browserView.toolbar.get('search').$el.val(),url=''!==searchTerm?'?search='+searchTerm:'';this.gridRouter.navigate(this.gridRouter.baseUrl(url),{replace:true});}});module.exports=EditAttachments;}),4817:(function(module){var MediaFrame=wp.media.view.MediaFrame,Library=wp.media.controller.Library,$=Backbone.$,Manage;Manage=MediaFrame.extend({initialize:function(){_.defaults(this.options,{title:'',modal:false,selection:[],library:{},multiple:'add',state:'library',uploader:true,mode:['grid','edit']});this.$body=$(document.body);this.$window=$(window);this.$adminBar=$('#wpadminbar');this.$uploaderToggler=$('.page-title-action').attr('aria-expanded','false').on('click',_.bind(this.addNewClickHandler,this));this.$window.on('scroll resize',_.debounce(_.bind(this.fixPosition,this),15));this.$el.addClass('wp-core-ui');if(wp.Uploader.limitExceeded||!wp.Uploader.browser.supported){this.options.uploader=false;}
if(this.options.uploader){this.uploader=new wp.media.view.UploaderWindow({controller:this,uploader:{dropzone:document.body,container:document.body}}).render();this.uploader.ready();$('body').append(this.uploader.el);this.options.uploader=false;}
this.gridRouter=new wp.media.view.MediaFrame.Manage.Router();MediaFrame.prototype.initialize.apply(this,arguments);this.$el.appendTo(this.options.container);this.createStates();this.bindRegionModeHandlers();this.render();this.bindSearchHandler();wp.media.frames.browse=this;},bindSearchHandler:function(){var search=this.$('#media-search-input'),searchView=this.browserView.toolbar.get('search').$el,listMode=this.$('.view-list'),input=_.throttle(function(e){var val=$(e.currentTarget).val(),url='';if(val){url+='?search='+val;this.gridRouter.navigate(this.gridRouter.baseUrl(url),{replace:true});}},1000);search.on('input',_.bind(input,this));this.gridRouter.on('route:search',function(){var href=window.location.href;if(href.indexOf('mode=')>-1){href=href.replace(/mode=[^&]+/g,'mode=list');}else{href+=href.indexOf('?')>-1?'&mode=list':'?mode=list';}
href=href.replace('search=','s=');listMode.prop('href',href);}).on('route:reset',function(){searchView.val('').trigger('input');});},createStates:function(){var options=this.options;if(this.options.states){return;}
this.states.add([new Library({library:wp.media.query(options.library),multiple:options.multiple,title:options.title,content:'browse',toolbar:'select',contentUserSetting:false,filterable:'all',autoSelect:false})]);},bindRegionModeHandlers:function(){this.on('content:create:browse',this.browseContent,this);this.on('edit:attachment',this.openEditAttachmentModal,this);this.on('select:activate',this.bindKeydown,this);this.on('select:deactivate',this.unbindKeydown,this);},handleKeydown:function(e){if(27===e.which){e.preventDefault();this.deactivateMode('select').activateMode('edit');}},bindKeydown:function(){this.$body.on('keydown.select',_.bind(this.handleKeydown,this));},unbindKeydown:function(){this.$body.off('keydown.select');},fixPosition:function(){var $browser,$toolbar;if(!this.isModeActive('select')){return;}
$browser=this.$('.attachments-browser');$toolbar=$browser.find('.media-toolbar');if(($browser.offset().top+16)<this.$window.scrollTop()+this.$adminBar.height()){$browser.addClass('fixed');$toolbar.css('width',$browser.width()+'px');}else{$browser.removeClass('fixed');$toolbar.css('width','');}},addNewClickHandler:function(event){event.preventDefault();this.trigger('toggle:upload:attachment');if(this.uploader){this.uploader.refresh();}},openEditAttachmentModal:function(model){if(wp.media.frames.edit){wp.media.frames.edit.open().trigger('refresh',model);}else{wp.media.frames.edit=wp.media({frame:'edit-attachments',controller:this,library:this.state().get('library'),model:model});}},browseContent:function(contentRegion){var state=this.state();this.browserView=contentRegion.view=new wp.media.view.AttachmentsBrowser({controller:this,collection:state.get('library'),selection:state.get('selection'),model:state,sortable:state.get('sortable'),search:state.get('searchable'),filters:state.get('filterable'),date:state.get('date'),display:state.get('displaySettings'),dragInfo:state.get('dragInfo'),sidebar:'errors',suggestedWidth:state.get('suggestedWidth'),suggestedHeight:state.get('suggestedHeight'),AttachmentView:state.get('AttachmentView'),scrollElement:document});this.browserView.on('ready',_.bind(this.bindDeferred,this));this.errors=wp.Uploader.errors;this.errors.on('add remove reset',this.sidebarVisibility,this);},sidebarVisibility:function(){this.browserView.$('.media-sidebar').toggle(!!this.errors.length);},bindDeferred:function(){if(!this.browserView.dfd){return;}
this.browserView.dfd.done(_.bind(this.startHistory,this));},startHistory:function(){if(window.history&&window.history.pushState){if(Backbone.History.started){Backbone.history.stop();}
Backbone.history.start({root:window._wpMediaGridSettings.adminUrl,pushState:true});}}});module.exports=Manage;})});var __webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(cachedModule!==undefined){return cachedModule.exports;}
var module=__webpack_module_cache__[moduleId]={exports:{}};__webpack_modules__[moduleId](module,module.exports,__webpack_require__);return module.exports;}
var __webpack_exports__={};!function(){var media=wp.media;media.controller.EditAttachmentMetadata=__webpack_require__(5817);media.view.MediaFrame.Manage=__webpack_require__(4817);media.view.Attachment.Details.TwoColumn=__webpack_require__(7433);media.view.MediaFrame.Manage.Router=__webpack_require__(9525);media.view.EditImage.Details=__webpack_require__(9157);media.view.MediaFrame.EditAttachments=__webpack_require__(5169);media.view.SelectModeToggleButton=__webpack_require__(6767);media.view.DeleteSelectedButton=__webpack_require__(471);media.view.DeleteSelectedPermanentlyButton=__webpack_require__(5562);}();})();