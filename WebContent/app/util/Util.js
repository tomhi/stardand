
/*
 * @author spq
 * 工具类
 */
Ext.define('AM.util.Util', {
	singleton: true,				// 单例
	alternateClassName: 'Util',		// 备用名
	loadObject: function(url) {		// 获取字段 可直接通过Util.loadObject(url)来访问
		var fields = Ext.Ajax.request({
		    url: url,
		    type: 'json',
		    async: false,
		    success: function(response, opts) {
		        
		    },
		    failure: function(response, opts) {
		        console.log('server-side failure with status code ' + response.status);
		    }
		});
		
		var obj = Ext.decode(fields.responseText);
        return obj;
	}
});