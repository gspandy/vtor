/**
 * jQuery vtor plugin 1.0.0
 * @author JsonZou, 2012-2012
 * @source ����VVC˼��Ľ����ҳ����֤js��ܡ��û��Զ������á�
 * @license MIT License <https://github.com/jsonzou/vtor>
 */
$vtor.cfg=function(config){
	/*
	  ***�û��Զ���������֤�ļ�����֯��ʽ***
      * func_pre ��֤����ǰ׺��Ĭ�� func
	  * view_pre �����ļ�ģ��ǰ׺��Ĭ�� @
	  * id_pre �����ļ�DOM idǰ׺��Ĭ�� #
	  * validateTerm_pre �����ļ������ǰ׺��Ĭ�� --
	  * msg_pre �����ļ���֤��ʾ��ǰ׺��Ĭ��::
	  * param_begin �����ļ���֤������ʼ�ַ���Ĭ�� (
	  * param_end �����ļ���֤���������ַ���Ĭ�� )
	  * param_split �����ļ���֤�����ָ�����Ĭ�� ,
	  * msg_type ��ʾ����:singleֻ��ʾ�ǰ��һ��������֤��multiple��ʾȫ��������֤��Ĭ�� single
	  */
      config.vtor={
	   msg_type:'single'
	  };

	  /*
	  ***�û�����򸲸���֤��***
      *������ʽ=��֤����ǰ׺[Ĭ��func_]+������������[function Name]:function(DOM ID[,��������]){[������]}
	  */

	  config.funcs={
       //ֻ����������
	   func_numeric:function(id){var val=$vtor.$id(id);return /^\d+$/.test(val);}
	   /*
	   * ��Ҫ�������ļ��е��ô˺���ֻ�����ã�
	   * --numeric()::ֻ����������
	   */
	 };

}