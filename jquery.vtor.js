/**
 * jQuery vtor plugin 1.0.0
 * @author JsonZou, 2012-2012
 * @source 基于VVC思想的解耦合页面验证js框架【核心controler】
 * @license MIT License <https://github.com/jsonzou/vtor>
 */
(function($){
   $vtor={
	   /**
		 * 初始化
		 */
	  $:function(path,view){
	     $vtor.init(path,view);
	  },
	  $v:function(){
	    return $vtor.validate();
	  },
	  $id:function(id){
		  return $vtor.util.getValById(id);
	  },
      init:function(path,view){
		 //加载lib、config、css
         $vtor.lib.init();
		 
		 var custom={};
		 
		 if($vtor.custom){
			 
		     $vtor.custom(custom);
			//重置用户验证文件格式
			 if(custom.vtor){
				  $.extend($vtor.config,custom.vtor);
			 }
			 //加入用户自定义验证函数库
			 if(custom.funcs){
			  $.extend($vtor.lib.funcs,custom.funcs);
		 }
		 
		 }
		  //获取验证文件配置信息
	       $vtor.core.getVtors(path);
		  //构建验证部件
		   $vtor.core.builtVtors();
		  //初始化验证模块 
		   $vtor.view=view;

		    //alert($vtor.vtorStr) 
			//alert(JSON.stringify($vtor.vtorObject)) 
		   },
      //配置文件字符串
      vtorStr:'',
	 //验证部件
      vtorObject:{},
	//验证模块
	  view:[],
	/*
	  ***vtor配置***
      * func_pre 验证函数前缀
	  * view_pre 配置文件模块前缀
	  * id_pre 配置文件DOM id前缀
	  * validateTerm_pre 配置文件验语句前缀
	  * msg_pre 配置文件验证提示语前缀
	  * param_begin 配置文件验证参数开始字符
	  * param_end 配置文件验证参数结束字符
	  * param_split 配置文件验证参数分隔符
	  * msg_type 提示类型：single只提示最靠前的一个错误验证；multiple提示全部错误验证
	  * msg_class 提示框的样式
	  * errInput_class 输入框错误的样式
	  * vtor_suf 验证文件扩展名配置
	  */
	 config:{
	     func_pre:'func',
		 view_pre:'@',
		 id_pre:'#',
         validateTerm_pre:'--',
		 msg_pre:'::',
		 param_begin:'(',
		 param_end:')',
		 param_split:',',
		 msg_type:'single',
		 msg_class:'vtor-input-err-msg',
		 errInput_class:'vtor-input-err-border',
		 vtor_suf:'vtor'
	  },
	/*
	  ***vtor常量***
	  * msg_html 错误提示信息html代码
	  * msg_type_single只提示最靠前的一个错误验证
	  * msg_type_multy提示全部错误验证
	  */
	constant:{
		func_middle:'_',
	    msg_html:"<span>&nbsp;</span>",
		msg_type_single:'single',
		msg_type_multiple:'multiple'
	  },
		//执行验证
	  validate:function(){
	    return $vtor.core.dovalidate($vtor.view);
	  },
	 /*
      ***工具包***
      * clearAnnotation 清楚注释
	  * trim 去掉字符串左右空白字符
	  * getParam 处理验证参数
	  */
      util:{
		getValById:function(id){
		   return $("#"+id).val();
		},
	    clearAnnotation:function(str){
			 return str.replace(/\/\*(\s|.)*?\*\//g,'').replace(/(?!http:)\/\/.*/g ,'');
		  },
		trim : function(str) { 
				return str.replace(/(^\s*)|(\s*$)/g, ""); 
				},
		getParam:function(param){
			   if(!$vtor.util.trim(param)){
			     return [];
			   }
               var paramArr=param.split($vtor.config.param_split);
			   if(!paramArr){
			     return [];
			   }
               for (p in paramArr )
               {
				paramArr[p]=$vtor.util.trim(paramArr[p])
               }
			  return paramArr;
			 },
		checkVtorPth:function(path){
				  var reg=new RegExp('\\.'+$vtor.config.vtor_suf+"$"); 
				  if(reg.test(path)){
				     return true;
				  }else{
				     alert('err:\npath->'+path+'\n is not the validator file!The validator file must be end width ".'+$vtor.config.vtor_suf+'"');
				  }
                   return reg.test(path);  
			 }
	  },
	/* 
	  ***验证核心包***
      * show 执行提示
	  * dovalidate 调用验证函数执行验证
	  * builtVtors 构建验证部件
	  * getVtors 获取配置文件验证信息
	  */
	  core:{
		  
		  show:function(id,msg){
			  var _ido=$("#"+id);
			  if(_ido&&_ido.length>0){
			  _ido.addClass($vtor.config.errInput_class);
			  var _msgo= _ido.next('span.'+$vtor.config.msg_class);
			  _msgo.html(msg);
		      _msgo.show(500);
              }
			  _ido=null;
		  },
		  dovalidate:function(view){
		            var resoult=true;
					for(v in view){
					   var ids=$vtor.vtorObject[view[v]];
					  for(id in ids){
                         var validateTerms=ids[id];
                         for(validateTerm in validateTerms){
						    var  _resoult=$vtor.lib.funcs[$vtor.config.func_pre+$vtor.constant.func_middle+validateTerm](id,validateTerms[validateTerm].param);
							if(!_resoult){
								resoult=resoult&&_resoult;
							  if($vtor.config.msg_type==$vtor.constant.msg_type_multiple){
								  $vtor.core.show(id,validateTerms[validateTerm].msg);
							     
							  }else{
								$('.'+$vtor.config.errInput_class).removeClass($vtor.config.errInput_class);
								$('.'+$vtor.config.msg_class).hide();
							   $vtor.core.show(id,validateTerms[validateTerm].msg);
						       return resoult;
							  }
						    }else{
							 
						
							  $('.'+$vtor.config.msg_class).hide();
							}
					    
						 }
					  }
					 }
					 
					 return resoult;
			 
			 
		  },
		  builtVtors:function(){
			 return  (function(){
			    var strs=$vtor.vtorStr.split($vtor.config.view_pre); 
			   for(s in strs){
				if($vtor.util.trim(strs[s])){
				   var validates=strs[s].split($vtor.config.id_pre)
				   var ids={};
				   for(var i=1;i<validates.length;i++){
					  if($vtor.util.trim(validates[i])){
							  var validateTerms=validates[i].split($vtor.config.validateTerm_pre);
							  
							  var rules={};
							  for(var g=1;g<validateTerms.length;g++){
								   var validateTerm= $vtor.util.trim(validateTerms[g]);
									  
									var func_id=$vtor.util.trim(validateTerm.substring(0,validateTerm.indexOf($vtor.config.param_begin)==-1?
										validateTerm.indexOf($vtor.config.msg_pre):validateTerm.indexOf($vtor.config.param_begin)
									));
									var param=$vtor.util.trim(validateTerm.substring(validateTerm.indexOf($vtor.config.param_begin)+1,validateTerm.indexOf($vtor.config.param_end)));
									var msg=validateTerm.split($vtor.config.msg_pre);
									var _msg='';
									if(msg.length==2){
										_msg=msg[1];
									}
									if(func_id){
										 
										rules[func_id]={param:$vtor.util.getParam(param),msg:_msg}
									}
									
							  }
							  //提示语句div
							  var _msgo=$($vtor.constant.msg_html);
							  var _ido= $("#"+$vtor.util.trim(validateTerms[0]));
							  if(_ido&&_ido.length>0){
							  _ido.after(_msgo);
							  _msgo.addClass($vtor.config.msg_class);
							  _msgo.css('left',_ido.offset().left+_ido.width())
							  _msgo.css('top',_ido.offset().top)
							  _ido.focus(function(){
								  $(this).next('span.'+$vtor.config.msg_class).hide(500);
								 
									  });
							  ids[$vtor.util.trim(validateTerms[0])]=rules;
							  }
					   }
				   }
				  $vtor.vtorObject[$vtor.util.trim(validates[0])]=ids;
				}
			  }	 
			  })();
		  },
		  getVtors:function(path){
			  if($vtor.util.checkVtorPth(path)){
			     
                    $.ajax({
					    type: "get",
					    url: path,
					    async:false,
					    dataType:'text',
					    success: function(data, textStatus){
						$vtor.vtorStr+=data;
				        } 
			        });
			      
				  $vtor.vtorStr=$vtor.util.clearAnnotation($vtor.vtorStr);

			  }
		  }
	   },
	 lib:{
		funcs:{},
	    init:function(){
		      /*
	   验证是否是email地址
	   @id=DOM id
	  */
      $vtor.lib.funcs[$vtor.config.func_pre+'_email']=function(id,undefined){
		 
         return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^[\\w\\-\\.]+@[\\w\\-\\.]+(\\.\\w+)+$');
       };
	  /*
	   验证是否为空
	   @id=DOM id
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_notNull']=function(id,undefined){
		   var _value=$vtor.$id(id);
		   if(_value.length>0){
			   return true;
		   } 
	      return false;
	   };
	  /*
	   座机0开头，7-8位
	   @id=DOM id
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_phone']=function(id,undefined){
		 
		   return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^((0\\d{2,3})-)(\\d{7,8})(-(\\d{3,}))?$');
	   
	   };
	 /*
	   手机号码，13,15,18开头
	   @id=DOM id
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_mobile']=function(id,undefined){
		  
		    return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^1[358]\\d{9}$');
	   };
	  $vtor.lib.funcs[$vtor.config.func_pre+'_date']=function(id,param){};
	  /*
	   验证区间，参数个数是1时验证区间值，参数个数是2时验证区间值范围
	   @id=DOM id
	   @param=(min[,max])
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_region']=function(id,param){
		   var _value= $vtor.$id(id);
		   if(_value.length==0){return true;}

	      if(param.lenth==0){
			  return false;
		  }
		 
		  if(!$vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^\\d+$')){
		    return false;
		  }
		   
		  if(param.length==1&&_value==param[0]){
		      return true;
		  }else if(param.length==2&&_value>=param[0]&&_value<=param[1]){
		      return true;
		  }
		 return false;
	   };
     /*
	   根据正则表达式验证
	   @id=DOM id
	   @regexp=正则表达式
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_regexp']=function(id,regexp){
	       var _value= $vtor.$id(id);
		   if(_value.length==0){return true;}
		  var re = new RegExp(regexp,''); // 创建正则表达式对象。
		   return re.test(_value);
	   };
	 /*    
       float([num])
	   验证小数点后有几位,无参数表示无限制
	   @id=DOM id
	   @param=([num])
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_float']=function(id,param){
	   if(param){
	      return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^\\d+\\.\\d{'+param[0]+'}$')
	   }
	  return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^\\d+\\.\\d+$')
	  };
	/*
	   验证字母。param[0]='a'小写;param[0]='A'大写;无参数，默认，大小写混合
	   @id=DOM id
	   @param=(['a'|'A'])
	  */
      $vtor.lib.funcs[$vtor.config.func_pre+'_abc']=function(id,param){
		 if(param&&param[0]=='a'){
		   return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'[a-z]+')
		 }
		 if(param&&param[0]=='A'){
		   return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'[A-Z]+')
		 }
	     return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'[a-zA-Z]+')
	   };
	  /*
	   验证数字类型param[0]=数字位数min;param[1]=数字位数max;参数只有一个则位数为固定值;无参数则默认不限制位数
	   @id=DOM id
	   @param=(min[,max])
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_123']=function(id,param){
		  if(param&&param.length==1&&/^\d+$/.test(param[0])){
                   return  $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'\\d'+'{'+param[0]+'}') 
		  }
		 if(param&&param.length==2&&/^\d+$/.test(param[0])&&/^\d+$/.test(param[1])){
                  return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'\\d{'+param[0]+','+param[1]+'}') 
		  }
		  return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^\\d+$') 
		};
	/*
	   验证字母。param[0]='a'字母开头;param[0]='1'数字开头;param[0]='_'下划线开头;无参数，默认，字母数字下划线混合
	   @id=DOM id
	   @param=(['a'|'1'|'_'])
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_a0_']=function(id,param){
		  if(param&&param[0]=='a'){
		    return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^[a-zA-Z]+[a-zA-Z_0-9]*$' )
		  }
		  if(param&&param[0]=='1'){
		    return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^\\d+[a-zA-Z_0-9]*$' )
		  }
		  if(param&&param[0]=='_'){
		    return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^\\d+[a-zA-Z_0-9]*$' )
		  }
		  return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'[a-zA-Z_0-9]+' ) 
		};
	/*
	   验证是否包含某个任意字符
	   @id=DOM id
	   @param=(string)
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_contain']=function(id,param){
		   var _value= $vtor.$id(id);
		    if(_value.length==0){
				return true;
			}
		   if(param&&_value.indexOf(param[0])!=-1){
		      return true;
		   }
		   return false;
		 };
	  $vtor.lib.funcs[$vtor.config.func_pre+'_idcard']=function(id,undefined){
		   return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d\|30))|(19\\d{2}(0[13578]|1[02])31)|(19\\d{2}02(0[1-9]|1\\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\\d{3}(\\d|X|x)?$');
	   };
	/*
	   验证比较param有两个参数：param[0]=['<','=','>','>=','<='];param[1]=比较的值
	   @id=DOM id
	   @param=(operator,value)
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_compare']=function(id,param){
		  var _value= $vtor.$id(id);
		    if(_value.length==0){
				return true;
			}
	     if(param&&param.length==2){
			 var operator=param[0];
		     var val=param[1];
			 var _value= $vtor.$id(id);
              return operator=='<'?_value<val:
				          operator=='>'?_value>val:
				          operator=='<='?_value<=val:
				          operator=='>='?_value>=val:
                          operator=='='?_value==val:false;
				 
		 }
		 return false;
	  };
	/*
	   验证长度，参数个数是1时验证长度值，参数个数是2时验证长度范围
	   @id=DOM id
	   @param=(min[,max])
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_len']=function(id,param){
		  var _value= $vtor.$id(id);
		    if(_value.length==0){
				return true;
			}
		  if(param.lenth==0){
			  return false;
		  }
		   var _value= $vtor.$id(id);
           var len=_value.length;
		  
		  if(param.length==1&&len==parseInt(param[0],10)){
		      return true;
		  }else if(param.length==2&&len>=parseInt(param[0],10)&&len<=parseInt(param[1],10)){
		      return true;
		  }
		 return false;
	   };
	 /*
	   验证正整数
	   @id=DOM id
	  */
     $vtor.lib.funcs[$vtor.config.func_pre+'_p_int']=function(id,undefined){
		 
	     return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^[0-9]*[1-9][0-9]*$' )
	 };
	 /*
	   验证负整数
	   @id=DOM id
	  */
	 $vtor.lib.funcs[$vtor.config.func_pre+'_n_int']=function(id,undefined){
		 
	    return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^\\-[0-9]*[1-9][0-9]*$' )
	 };
	  /*
	   验证正数
	   @id=DOM id
	  */
	 $vtor.lib.funcs[$vtor.config.func_pre+'_p_123']=function(id,undefined){
	   return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^(([1-9]+[0-9]*.{1}[0-9]+)|([0].{1}[1-9]+[0-9]*)|([1-9][0-9]*)|([0][.][0-9]+[1-9]*))$' );
	 };
	 /*
	   验证负数
	   @id=DOM id
	  */
	 $vtor.lib.funcs[$vtor.config.func_pre+'_n_123']=function(id,undefined){
	   return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^\\-(([1-9]+[0-9]*.{1}[0-9]+)|([0].{1}[1-9]+[0-9]*)|([1-9][0-9]*)|([0][.][0-9]+[1-9]*))$' );
	 };
	  /*
	   验证非负数
	   @id=DOM id
	  */
	 $vtor.lib.funcs[$vtor.config.func_pre+'_not_n_123']=function(id,undefined){
		 return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^\\d+(\\.\\d+)?$' )
	    
	 };
	/*
	   验证ip
	   @id=DOM id
	  */
	 $vtor.lib.funcs[$vtor.config.func_pre+'_ip']=function(id,undefined){
		 return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^((0[0-9]|1[0-9]\\d{1,2})|(2[0-5][0-5])|(2[0-4][0-9])|(\\d{1,2}))\\.((0[0-9]|1[0-9]\\d{1,2})|(2[0-5][0-5])|(2[0-4][0-9])|(\\d{1,2}))\\.((0[0-9]|1[0-9]\\d{1,2})|(2[0-4][0-9])|(2[0-5][0-5])|(\\d{1,2}))\\.((0[0-9]|1[0-9]\\d{1,2})|(2[0-4][0-9])|(2[0-5][0-5])|(\\d{1,2}))$' )
	  
	 };
	/*
	   验证网址url
	   @id=DOM id
	  */
	 $vtor.lib.funcs[$vtor.config.func_pre+'_url']=function(id,undefined){
		 return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$' );
	   
	 };
	/*
	   验证汉字
	   @id=DOM id
	  */
	 $vtor.lib.funcs[$vtor.config.func_pre+'_chinese']=function(id,undefined){
		 return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^[\u4e00-\u9fa5]+$' );
	 };
     /*
	   验证邮政编码
	   @id=DOM id
	  */
	 $vtor.lib.funcs[$vtor.config.func_pre+'_zipcode']=function(id,undefined){
		 return $vtor.lib.funcs[$vtor.config.func_pre+'_regexp'](id,'^[a-zA-Z0-9 ]{3,12}$' )
	 };
	/*
	   ajax验证
	   @return {resoult:true[false]}
	   @id=DOM id
	   @param(url)
	  */
	 $vtor.lib.funcs[$vtor.config.func_pre+'_ajax']=function(id,param){
		 var _value= $vtor.$id(id);
		    if(_value.length==0){
				return true;
			}
		 var ajaxResoult=false;
		 if(param&&param[0].length>0){
		 $.ajax({
				type:'get',
				async:false,
			    dataType:'json',
				url:param[0],
				data:id+"="+$vtor.$id(id),
				success:function(data){
				   ajaxResoult=data.resoult;
				},
			    error:function(){
				   alert('err:\n id='+id+' ajax validator error!');
				} 
		 });
       }else{
		   
	     alert('err:\n id='+id+' ajax validator error! param of url not found ！');
		 return false;
	   }
      return ajaxResoult;
	 };
	 /*
	   验证永远成功
	   @id=DOM id
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_ok']=function(id,undefined){
	      return true;
	   };
	  /*
	   验证永远失败
	   @id=DOM id
	  */
	  $vtor.lib.funcs[$vtor.config.func_pre+'_err']=function(id,undefined){
	      return false;
	   }
		
		
		}
		
	   }
   
   }; 
  
})(jQuery);