package com.sanyanyu.syybi.utils;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.commons.dbutils.BasicRowProcessor;

/**
 * 用于apache的dbutil类的功能改进，当需要Map中的Key能按输入的顺序输出时，使用这个类来进行处理。简单改了一下基类。
 * 
 * @Description: 
 *               用于apache的dbutil类的功能改进，当需要Map中的Key能按输入的顺序输出时，使用这个类来进行处理。简单改了一下基类。
 * @author Ivan 2862099249@qq.com
 * @date 2014年12月5日 下午8:33:57
 * @version V1.0
 */
public class BasicRowProcessorEx extends BasicRowProcessor {

	private static class CaseInsensitiveLinkedHashMap extends HashMap<String, Object> {
		private final Map<String, String> lowerCaseMap = new LinkedHashMap<String, String>();
		private static final long serialVersionUID = -2848100435296897392L;

		/** {@inheritDoc} */
		@Override
		public boolean containsKey(Object key) {
			Object realKey = lowerCaseMap.get(key.toString().toLowerCase());
			return super.containsKey(realKey);
		}

		/** {@inheritDoc} */
		@Override
		public Object get(Object key) {
			Object realKey = lowerCaseMap.get(key.toString().toLowerCase());
			return super.get(realKey);
		}

		/** {@inheritDoc} */
		@Override
		public Object put(String key, Object value) {
			Object oldKey = lowerCaseMap.put(key.toLowerCase(), key);
			Object oldValue = super.remove(oldKey);
			super.put(key, value);
			return oldValue;
		}

		/** {@inheritDoc} */
		@Override
		public void putAll(Map<? extends String, ?> m) {
			for (Map.Entry<? extends String, ?> entry : m.entrySet()) {
				String key = entry.getKey();
				Object value = entry.getValue();
				this.put(key, value);
			}
		}

		/** {@inheritDoc} */
		@Override
		public Object remove(Object key) {
			Object realKey = lowerCaseMap.remove(key.toString().toLowerCase());
			return super.remove(realKey);
		}
	}

	@Override
	public Map<String, Object> toMap(ResultSet rs) throws SQLException {
		Map<String, Object> result = new CaseInsensitiveLinkedHashMap();
		ResultSetMetaData rsmd = rs.getMetaData();
		int cols = rsmd.getColumnCount();

		for (int i = 1; i <= cols; i++) {
			result.put(rsmd.getColumnName(i), rs.getObject(i));
		}

		return result;
	}

}
