/*
 * @author spq
 * extjs提供了filterBy,filter等多种方法来过滤数据达到查询效果，
 * 但在treepanel中的treeStore却没有实现这个查询
 */
Ext.define('AM.util.TreeFilter', {
	
	nodesAndParents: [],
	
	/**
	 * 根据字符串过滤所有的节点，将不符合条件的节点进行隐藏.
	 *
	 * @param 查询字符串.
	 * @param 要查询的列.
	 */
	addCondition : function (text, by) {

		var view = this.getView(), me = this;

		// 找到匹配的节点并展开.
		// 添加匹配的节点和他们的父节点到nodesAndParents数组.
		this.getRootNode().cascadeBy(function (tree, view) {
			var currNode = this;

			if (currNode && currNode.data[by]
				 && currNode.data[by].toString().toLowerCase().indexOf(
					text.toLowerCase()) > -1) {
				
				//me.expandPath(currNode.getPath());
				while (currNode.parentNode) {
					//console.log('#currNode: ' + currNode.data['text'] + ': path: ' + currNode.getPath());
					me.nodesAndParents.push(currNode.id);
					currNode = currNode.parentNode;
				}
			}
		}, null, [me, view]);
	},
	
	doQuery: function() {
		var view = this.getView(), me = this;
		// 将不在nodesAndParents数组中的节点隐藏
		this.getRootNode().cascadeBy(function (tree, view) {
			var uiNode = view.getNodeByRecord(this);
			if (uiNode) {
				if(!Ext.Array.contains(me.nodesAndParents, this.id)) {
					Ext.get(uiNode).setDisplayed('none');
				} else {
					Ext.get(uiNode).setDisplayed('table-row');
				}
			}
		}, null, [me, view]);
	},
	
	// 重置
	reset: function() {
		this.nodesAndParents = [];
		var view = this.getView();
		this.getRootNode().cascadeBy(function (tree, view) {
			var uiNode = view.getNodeByRecord(this);
			if (uiNode) {
				Ext.get(uiNode).setDisplayed('none');
			}
		}, null, [this, view]);
	}
});
