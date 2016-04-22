package core.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Condition {
	
	private String field;
	private String type;
	private String value;
	
	public String toString() {	// 返回符合sql格式的字符串
		if(type != null) {
			if("like".equals(type.toLowerCase())) {
				return field + " " + type + " '%" + value + "%'";	// 后期改为substr
			} else {
				/*if(isNumeric(value)) {
					return field + " " + type + " " + value;
				} else {
					return field + " " + type + " '" + value + "'";
				}*/
				return field + " " + type + " '" + value + "'";
			}
		}
		return this.toString();
	}
	
	public static boolean isNumeric(String str) {
		Pattern pattern = Pattern.compile("^\\d+$|^\\d+\\.\\d+$|-\\d+$");
		Matcher isNum = pattern.matcher(str);
		if (!isNum.matches()) {
			return false;
		}
		return true;
	}
	
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}
