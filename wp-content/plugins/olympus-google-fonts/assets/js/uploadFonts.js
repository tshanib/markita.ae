(function($){OgfUploadFonts={init:function()
{this._fileUploads();},_fileUploads:function()
{var file_frame;window.inputWrapper='';$(document.body).on('click','.ogf-custom-fonts-upload',function(event){event.preventDefault();var button=$(this),button_type=button.data('upload-type');window.inputWrapper=$(this).closest('.ogf-custom-fonts-file-wrap');if(file_frame){file_frame.open();return;}
file_frame=wp.media.frames.file_frame=wp.media({multiple:false});file_frame.on('select',function(){var attachment=file_frame.state().get('selection').first().toJSON();window.inputWrapper.find('.ogf-custom-fonts-link').val(attachment.url);});file_frame.open();});var file_frame;window.inputWrapper='';},}
$(function(){OgfUploadFonts.init();});})(jQuery);