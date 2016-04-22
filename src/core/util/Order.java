package core.util;

public class Order {
	
	private String field;
	private String value;
	
	public String toString() {	// 返回符合sql格式的字符串
		return field + " " + value;
	}
	
	public String getField() {
		return field;
	}
	public void setField(String field) {
		this.field = field;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
}
