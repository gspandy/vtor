/**
 * jQuery vtor plugin 1.0.0
 * @author JsonZou, 2012-2012
 * @source ����֤���
 * @license MIT License <https://github.com/jsonzou/vtor>
 */

(function(){
   $vtor_func={
	  vtor_func_specification:{
		  isSpecify:function(func,param){
		     $vtor_fu.vtor_func_specification.specification['spec_'+func];
		  },
		  specification:{
		     spec_email:{},
			 spec_empty:{} 
		  }
		  
	  },
	 /*
	   ��֤�Ƿ���email��ַ
	   @id=DOM id
	  */
      func_email:function(id,undefined){
         return $vtor_func.func_regexp(id,'^[\\w\\-\\.]+@[\\w\\-\\.]+(\\.\\w+)+$');
       },
	  /*
	   ��֤�Ƿ�Ϊ��
	   @id=DOM id
	  */
	  func_empty:function(id,undefined){
		   var _value= $("#"+id).val();
		   if(_value.length>0){
			   return true;
		   } 
	      return false;
	   },
	  /*
	   ����0��ͷ��7-8λ
	   @id=DOM id
	  */
	  func_phone:function(id,undefined){
		   return $vtor_func.func_regexp(id,'^((0\\d{2,3})-)(\\d{7,8})(-(\\d{3,}))?$');
	   
	   },
	 /*
	   �ֻ����룬13,15,18��ͷ
	   @id=DOM id
	  */
	  func_mobile:function(id,undefined){
		    return $vtor_func.func_regexp(id,'^1[358]\\d{9}$');
	   },
	  func_date:function(id,param){},
	  /*
	   ��֤���䣬����������1ʱ��֤����ֵ������������2ʱ��֤����ֵ��Χ
	   @id=DOM id
	   @param=(min[,max])
	  */
	  func_region:function(id,param){
	      if(param.lenth==0){
			  return false;
		  }
		 
		  if(!$vtor_func.func_regexp(id,'\\d+')){
		    return false;
		  }
		    var _value= $("#"+id).val();
		  if(param.length==1&&_value==param[0]){
		      return true;
		  }else if(param.length==2&&_value>=param[0]&&_value<=param[1]){
		      return true;
		  }
		 return false;
	   },
     /*
	   ����������ʽ��֤
	   @id=DOM id
	   @regexp=������ʽ
	  */
	  func_regexp:function(id,regexp){
	       var _value= $("#"+id).val();
		   if(!_value){
		      return false;
		   }
		  var re = new RegExp(regexp,''); // ����������ʽ����
		   return _value.match(re);
	   },
	 /*    
       float([num])
	   ��֤С������м�λ,�޲�����ʾ������
	   @id=DOM id
	   @param=([num])
	  */
	  func_float:function(id,param){
	   if(param){
	      return $vtor_func.func_regexp(id,'^\\d+\\.\\d{'+param[0]+'}$')
	   }
	  return $vtor_func.func_regexp(id,'^\\d+\\.\\d+$')
	  },
	/*
	   ��֤��ĸ��param[0]='a'Сд;param[0]='A'��д;�޲�����Ĭ�ϣ���Сд���
	   @id=DOM id
	   @param=(['a'|'A'])
	  */
      func_abc:function(id,param){
		 if(param&&param[0]=='a'){
		   return $vtor_func.func_regexp(id,'[a-z]+')
		 }
		 if(param&&param[0]=='A'){
		   return $vtor_func.func_regexp(id,'[A-Z]+')
		 }
	     return $vtor_func.func_regexp(id,'[a-zA-Z]+')
	   },
	  /*
	   ��֤��������param[0]=����λ��min;param[1]=����λ��max;����ֻ��һ����λ��Ϊ�̶�ֵ;�޲�����Ĭ�ϲ�����λ��
	   @id=DOM id
	   @param=(min[,max])
	  */
	  func_123:function(id,param){
		  if(param&&param.length==1&&/\d+/.test(param[0])){
                   return  $vtor_func.func_regexp(id,'\\d'+'{'+param[0]+'}') 
		  }
		 if(param&&param.length==2&&/\d+/.test(param[0])&&/\d+/.test(param[1])){
                  return $vtor_func.func_regexp(id,'\\d{'+param[0]+','+param[1]+'}') 
		  }
		  return $vtor_func.func_regexp(id,'\\d+') 
		},
	/*
	   ��֤��ĸ��param[0]='a'��ĸ��ͷ;param[0]='1'���ֿ�ͷ;param[0]='_'�»��߿�ͷ;�޲�����Ĭ�ϣ���ĸ�����»��߻��
	   @id=DOM id
	   @param=(['a'|'1'|'_'])
	  */
	  func_a0_:function(id,param){
		  if(param&&param[0]=='a'){
		    return $vtor_func.func_regexp(id,'^[a-zA-Z]+[a-zA-Z_0-9]*$' )
		  }
		  if(param&&param[0]=='1'){
		    return $vtor_func.func_regexp(id,'^\\d+[a-zA-Z_0-9]*$' )
		  }
		  if(param&&param[0]=='_'){
		    return $vtor_func.func_regexp(id,'^\\d+[a-zA-Z_0-9]*$' )
		  }
		  return $vtor_func.func_regexp(id,'[a-zA-Z_0-9]+' ) 
		},
	/*
	   ��֤�Ƿ����ĳ�������ַ�
	   @id=DOM id
	   @param=(string)
	  */
	  func_contain:function(id,param){
		   var _value= $("#"+id).val();
		   if(!_value){
		      return false;
		   }
		   if(param&&_value.indexOf(param[0])!=-1){
		      return true;
		   }
		   return false;
		 },
	  func_idcard:function(id,undefined){
		   return $vtor_func.func_regexp(id,'^((1[1-5])|(2[1-3])|(3[1-7])|(4[1-6])|(5[0-4])|(6[1-5])|71|(8[12])|91)\d{4}((19\\d{2}(0[13-9]|1[012])(0[1-9]|[12]\d\|30))|(19\\d{2}(0[13578]|1[02])31)|(19\\d{2}02(0[1-9]|1\\d|2[0-8]))|(19([13579][26]|[2468][048]|0[48])0229))\\d{3}(\\d|X|x)?$');
	   },
	/*
	   ��֤�Ƚ�param������������param[0]=['<','=','>','>=','<='];param[1]=�Ƚϵ�ֵ
	   @id=DOM id
	   @param=(operator,value)
	  */
	  func_compare:function(id,param){
	     if(param&&param.length==2){
			 var operator=param[0];
		     var val=param[1];
			 var _value= $("#"+id).val();
              return operator=='<'?_value<val:
				          operator=='>'?_value>val:
				          operator=='<='?_value<=val:
				          operator=='>='?_value>=val:
                          operator=='='?_value==val:false;
				 
		 }
		 return false;
	  },
	/*
	   ��֤���ȣ�����������1ʱ��֤����ֵ������������2ʱ��֤���ȷ�Χ
	   @id=DOM id
	   @param=(min[,max])
	  */
	  func_len:function(id,param){
		  if(param.lenth==0){
			  return false;
		  }
		   var _value= $("#"+id).val();
           var len=_value.length;
		  
		  if(param.length==1&&len==parseInt(param[0],10)){
		      return true;
		  }else if(param.length==2&&len>=parseInt(param[0],10)&&len<=parseInt(param[1],10)){
		      return true;
		  }
		 return false;
	   },
	 /*
	   ��֤������
	   @id=DOM id
	  */
     func_p_int:function(id,undefined){
		 
	     return $vtor_func.func_regexp(id,'^[0-9]*[1-9][0-9]*$' )
	 },
	 /*
	   ��֤������
	   @id=DOM id
	  */
	 func_n_int:function(id,undefined){
		 
	    return $vtor_func.func_regexp(id,'^\\-[0-9]*[1-9][0-9]*$' )
	 },
	  /*
	   ��֤����
	   @id=DOM id
	  */
	 func_p_123:function(id,undefined){
	   return $vtor_func.func_regexp(id,'^(([1-9]+[0-9]*.{1}[0-9]+)|([0].{1}[1-9]+[0-9]*)|([1-9][0-9]*)|([0][.][0-9]+[1-9]*))$' );
	 },
	 /*
	   ��֤����
	   @id=DOM id
	  */
	 func_n_123:function(id,undefined){
	   return $vtor_func.func_regexp(id,'^\\-(([1-9]+[0-9]*.{1}[0-9]+)|([0].{1}[1-9]+[0-9]*)|([1-9][0-9]*)|([0][.][0-9]+[1-9]*))$' );
	 },
	  /*
	   ��֤�Ǹ���
	   @id=DOM id
	  */
	 func_not_n_123:function(id,undefined){
		 return $vtor_func.func_regexp(id,'^\\d+(\\.\\d+)?$' )
	    
	 },
	/*
	   ��֤ip
	   @id=DOM id
	  */
	 func_ip:function(id,undefined){
		 return $vtor_func.func_regexp(id,'^((0[0-9]|1[0-9]\\d{1,2})|(2[0-5][0-5])|(2[0-4][0-9])|(\\d{1,2}))\\.((0[0-9]|1[0-9]\\d{1,2})|(2[0-5][0-5])|(2[0-4][0-9])|(\\d{1,2}))\\.((0[0-9]|1[0-9]\\d{1,2})|(2[0-4][0-9])|(2[0-5][0-5])|(\\d{1,2}))\\.((0[0-9]|1[0-9]\\d{1,2})|(2[0-4][0-9])|(2[0-5][0-5])|(\\d{1,2}))$' )
	  
	 },
	/*
	   ��֤��ַurl
	   @id=DOM id
	  */
	 func_url:function(id,undefined){
		 return $vtor_func.func_regexp(id,'^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$' );
	   
	 },
	/*
	   ��֤����
	   @id=DOM id
	  */
	 func_chinese:function(id,undefined){
		 return $vtor_func.func_regexp(id,'^[\u4e00-\u9fa5]+$' );
	 },
     /*
	   ��֤��������
	   @id=DOM id
	  */
	 func_zipcode:function(id,undefined){
		 return $vtor_func.func_regexp(id,'^[a-zA-Z0-9 ]{3,12}$' )
	 },
	 /*
	   ��֤��Զ�ɹ�
	   @id=DOM id
	  */
	  func_ok:function(id,undefined){
	      return true;
	   },
	  /*
	   ��֤��Զʧ��
	   @id=DOM id
	  */
	  func_err:function(id,undefined){
	      return false;
	   }
   };
})();