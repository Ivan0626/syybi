package com.sanyanyu.syybi.utils;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.commons.dbutils.QueryRunner;
import org.apache.commons.dbutils.handlers.BeanHandler;
import org.apache.commons.dbutils.handlers.BeanListHandler;
import org.apache.commons.dbutils.handlers.MapHandler;
import org.apache.commons.dbutils.handlers.MapListHandler;
import org.apache.log4j.Logger;

import com.sanyanyu.syybi.annotation.Column;
import com.sanyanyu.syybi.annotation.Table;

/**
 * 操作数据库的工具类
 * 
 * @Description: 操作数据库的工具类
 * @author Ivan 2862099249@qq.com
 * @date 2014年11月26日 下午5:25:07
 * @version V1.0
 */
public class SqlUtil {
	private static Logger logger = Logger.getLogger(SqlUtil.class);
	private QueryRunner qr = null;
	private DataSource ds = null;
	private Connection conn = null;

	/**
	 * 关闭数据库连接
	 */
	public void closeConn() {
		if (conn != null) {
			try {
				conn.close();
				conn = null;
			} catch (SQLException e) {
				logger.error("Close the connection instance failed:" + e, e);
			}
		}
	}

	public Connection getConn(){
		return conn;
	}
	
	/**
	 * 设置数据源
	 * 
	 * @param ds
	 *            数据源对象
	 */
	public void setDataSource(DataSource ds) {
		this.ds = ds;
	}

	/**
	 * 设置数据源
	 * 
	 * @param name
	 *            msh.properties中配置的JNDI映射名称
	 */
	public void setDataSource(String name) {
		String jdni = PropertiesUtil.getValue(name);
		try {
			Context initCtx = new InitialContext();

			this.ds = (DataSource) initCtx.lookup(jdni);
		} catch (NamingException e) {
			logger.error("Get jdbc [" + jdni + "] datasource failed:" + e, e);
		}
	}

	public SqlUtil() {
		//1、Tomcat自带连接池
		//this.setDataSource("comp.env.jdbc");
		
		//2、Apache dbcp连接池，JDBCUtils提供事务的支持
		this.setDataSource(JDBCUtils.getDataSource());
		
	}
	
	

	/**
	 * 扩展方法，方便不启动Web容器，直接通过JDBC连接操作数据库，当前只为测试方便
	 * 
	 * @param url
	 * @param username
	 * @param password
	 */
	public SqlUtil(String url, String username, String password) {
		try {
			Class.forName(PropertiesUtil.getValue("driverClassName"));
		} catch (ClassNotFoundException e1) {
			logger.error("Not found com.mysql.jdbc.Driver:" + e1, e1);
		}
		try {
			this.conn = DriverManager.getConnection(url, username, password);
		} catch (SQLException e) {
			logger.error("Get connection failed,please check url/username/password correct:" + e, e);
		}
	}

	public static void test() throws Exception {
		String sql = "select * from advert_keys";

		SqlUtil sqlUtil = new SqlUtil();

		List<Map<String, Object>> list = sqlUtil.searchList(sql);
		System.out.println(list.size());
		if (list != null && list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				System.out.println(list.get(i).get("id"));
				System.out.println(list.get(i).get("nam"));
				logger.error("test log4j");

			}
		}
		/*
		 * List<User> userList = SqlUtil.search(conn, User.class, sql, new
		 * Object[]{"1001","admin"}); for(int i=0;i<userList.size();i++){
		 * System.out.println(userList.get(i).getId());
		 * System.out.println(userList.get(i).getUserName()); }
		 * 
		 * 
		 * String sql1 = "update rg_user set flag = 1 where id=?"; int n =
		 * SqlUtil.update(conn, sql1, new Object[]{"1001"});
		 * System.out.println(n);
		 * 
		 * 
		 * String sql2 = "select * from rg_user where id ='1001'";
		 * Map<String,Object> map = SqlUtil.getById(conn, sql2, null);
		 * System.out.println(map.get("id"));
		 */

	}

	/**
	 * 查询
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> searchList(String sql, Object... params) {

		qr = new QueryRunner(ds);

		List<Map<String, Object>> mapList = null;
		try {
			if (params.length == 0) {
				mapList = qr.query(sql, new MapListHandler(new BasicRowProcessorEx()));
			} else {
				mapList = qr.query(sql, new MapListHandler(new BasicRowProcessorEx()), params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for the method of List<Map<String, Object>> searchList:" + e, e);
		}
		return mapList;
	}

	/**
	 * 查询
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public List<Map<String, Object>> searchListForConn(String sql, Object... params) {

		qr = new QueryRunner();

		List<Map<String, Object>> mapList = null;
		try {
			if (params.length == 0) {
				mapList = qr.query(conn, sql, new MapListHandler(new BasicRowProcessorEx()));
			} else {
				mapList = qr.query(conn, sql, new MapListHandler(new BasicRowProcessorEx()), params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for the method of List<Map<String, Object>> searchListForConn:" + e, e);
		}
		return mapList;
	}

	/**
	 * 查询,将结果返回到bean中,多个bean通过List包装返回
	 * 
	 * @param entityClass
	 * @param sql
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public <T> List<T> searchList(Class<T> entityClass, String sql, Object... params) {

		qr = new QueryRunner(ds);

		List<T> list = null;
		try {
			if (params.length == 0) {
				list = (List<T>) qr.query(sql, new BeanListHandler(entityClass));
			} else {
				list = (List<T>) qr.query(sql, new BeanListHandler(entityClass), params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for the method of List<T> searchList:" + e, e);
		}
		return list;
	}
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public <T> T search(Class<T> entityClass, String sql, Object... params) {

		qr = new QueryRunner(ds);
		T ret = null;
		try {
			if (params.length == 0) {
				ret = (T) qr.query(sql, new BeanHandler(entityClass));
			} else {
				ret = (T) qr.query(sql, new BeanHandler(entityClass), params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for the method of T search:" + e, e);
		}
		return ret;
	}

	/**
	 * 查询,将结果返回到bean中,多个bean通过List包装返回
	 * 
	 * @param entityClass
	 * @param sql
	 * @param params
	 * @return
	 */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public <T> List<T> searchListForConn(Class<T> entityClass, String sql, Object... params) {

		qr = new QueryRunner();

		List<T> list = null;
		try {
			if (params.length == 0) {
				list = (List<T>) qr.query(conn, sql, new BeanListHandler(entityClass));
			} else {
				list = (List<T>) qr.query(conn, sql, new BeanListHandler(entityClass), params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for the method of List<T> searchListForConn:" + e, e);
		}
		return list;
	}

	/**
	 * 查询
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public Map<String, Object> search(String sql, Object... params) {

		qr = new QueryRunner(ds);

		Map<String, Object> map = null;
		try {
			if (params.length == 0) {
				map = qr.query(sql, new MapHandler());
			} else {
				map = qr.query(sql, new MapHandler(), params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for the method of Map<String, Object> search:" + e, e);
		}
		return map;
	}

	/**
	 * 查询
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public Map<String, Object> searchForConn(String sql, Object... params) {

		qr = new QueryRunner();

		Map<String, Object> map = null;
		try {
			if (params.length == 0) {
				map = qr.query(conn, sql, new MapHandler());
			} else {
				map = qr.query(conn, sql, new MapHandler(), params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for the method of Map<String, Object> searchForConn:" + e, e);
		}
		return map;
	}

	/**
	 * 通过主键查找记录
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public Map<String, Object> getById(String sql, Object... params) {

		qr = new QueryRunner(ds);

		Map<String, Object> map = null;
		try {
			if (params.length == 0) {
				map = qr.query(sql, new MapHandler());
			} else {
				map = qr.query(sql, new MapHandler(), params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for the method of Map<String, Object> getById:" + e, e);
		}
		return map;
	}

	/**
	 * 通过主键查找记录
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public Map<String, Object> getByIdForConn(String sql, Object... params) {

		qr = new QueryRunner();

		Map<String, Object> map = null;
		try {
			if (params.length == 0) {
				map = qr.query(conn, sql, new MapHandler());
			} else {
				map = qr.query(conn, sql, new MapHandler(), params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for the method of Map<String, Object> getById:" + e, e);
		}
		return map;
	}

	/**
	 * 查询表的记录总数
	 * 
	 * @param table
	 * @return
	 */
	public long getTotal(String table) {

		qr = new QueryRunner(ds);

		long total = 0;
		String field = "TOTAL";
		String sql = "SELECT COUNT(*) AS " + field + " FROM " + table;
		try {
			Map<String, Object> map = (Map<String, Object>) qr.query(sql, new MapHandler());

			String n = map.get(field).toString();
			total = Long.parseLong(n);
		} catch (SQLException e) {
			logger.error("Jdbc exception for query total of [" + table + "] table:" + e, e);
		}
		return total;
	}

	/**
	 * 查询表的记录总数
	 * 
	 * @param table
	 * @return
	 */
	public long getTotalForConn(String table) {

		qr = new QueryRunner();

		long total = 0;
		String field = "TOTAL";
		String sql = "SELECT COUNT(*) AS " + field + " FROM " + table;
		try {
			Map<String, Object> map = qr.query(conn, sql, new MapHandler());

			String n = map.get(field).toString();
			total = Long.parseLong(n);
		} catch (SQLException e) {
			logger.error("Jdbc exception for query total of [" + table + "] table:" + e, e);
		}
		return total;
	}

	/**
	 * 更新,返回更新记录条数
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int update(String sql, Object... params) {

		qr = new QueryRunner(ds);

		int n = 0;
		try {
			if (params.length == 0) {
				n = qr.update(sql);
			} else {
				n = qr.update(sql, params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for update method:" + e, e);
		}
		return n;
	}
	
	/**
	 * 更新,返回更新记录条数
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int update(Connection conn, String sql, Object... params) {

		qr = new QueryRunner();

		int n = 0;
		try {
			if (params.length == 0) {
				n = qr.update(conn, sql);
			} else {
				n = qr.update(conn, sql, params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for update method:" + e, e);
		}
		return n;
	}

	/**
	 * 更新,返回更新记录条数
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int updateForConn(String sql, Object... params) {

		qr = new QueryRunner();

		int n = 0;
		try {
			if (params.length == 0) {
				n = qr.update(conn, sql);
			} else {
				n = qr.update(conn, sql, params);
			}
		} catch (SQLException e) {
			logger.error("Jdbc exception for update method:" + e, e);
		}
		return n;
	}

	/**
	 * 删除,返回删除的记录条数
	 * 
	 * @param sql
	 * @param params
	 * @return
	 * 
	 */
	public int delete(String sql, Object... params) {

		return update(sql, params);

	}
	
	/**
	 * 删除,返回删除的记录条数
	 * 
	 * @param sql
	 * @param params
	 * @return
	 * 
	 */
	public int delete(Connection conn, String sql, Object... params) {

		return update(conn, sql, params);

	}

	/**
	 * 插入数据,返回插入的记录条数
	 * 
	 * @param sql
	 * @param params
	 * @return
	 * 
	 */
	public int insert(String sql, Object... params) {

		return update(sql, params);

	}
	
	/**
	 * 插入数据,返回插入的记录条数
	 * 
	 * @param sql
	 * @param params
	 * @return
	 * 
	 */
	public int insert(Connection conn, String sql, Object... params) {

		return update(conn, sql, params);

	}

	/**
	 * 删除,返回删除的记录条数
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int deleteForConn(String sql, Object... params) {

		return updateForConn(sql, params);

	}

	/**
	 * 插入数据,返回插入的记录条数
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int insertForConn(String sql, Object... params) {

		return updateForConn(sql, params);

	}

	/**
	 * 批量操作记录
	 * 
	 * @param sql
	 * @param params
	 * @return
	 * 
	 */
	private int[] batch(String sql, Object[][] params) {

		qr = new QueryRunner(ds);
		int[] rows = new int[0];
		try {
			rows = qr.batch(sql, params);
		} catch (SQLException e) {
			logger.error("Jdbc exception for batch method:" + e, e);
		}
		return rows;

	}
	
	/**
	 * 批量操作记录
	 * 
	 * @param sql
	 * @param params
	 * @return
	 * 
	 */
	private int[] batch(Connection conn, String sql, Object[][] params) {

		qr = new QueryRunner();
		int[] rows = new int[0];
		try {
			rows = qr.batch(conn, sql, params);
		} catch (SQLException e) {
			logger.error("Jdbc exception for batch method:" + e, e);
		}
		return rows;

	}


	/**
	 * 批量操作记录
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	private int[] batchForConn(String sql, Object[][] params) {

		qr = new QueryRunner();
		int[] rows = new int[0];
		try {
			rows = qr.batch(conn, sql, params);
		} catch (SQLException e) {
			logger.error("Jdbc exception for batch method:" + e, e);
		}
		return rows;

	}

	/**
	 * 批量修改
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int[] batchUpdate(String sql, Object[][] params) {
		return batch(sql, params);
	}
	
	/**
	 * 批量修改
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int[] batchUpdate(Connection conn, String sql, Object[][] params) {
		return batch(conn, sql, params);
	}

	/**
	 * 批量删除
	 * 
	 * @param sql
	 * @param params
	 * @return sql:delete from advert_keys t where t.id = ? and t.name = ?
	 *         params: Object[][] objs = new Object[][]; Object[] obj1 = new
	 *         Object[]{1,zhangsan}, Object[] obj1 = new Object[]{2,lisi},
	 *         objs[0] = obj1;objs[0] = obj2;
	 */
	public int[] batchDelete(String sql, Object[][] params) {
		return batch(sql, params);
	}
	
	/**
	 * 批量删除
	 * 
	 * @param sql
	 * @param params
	 * @return sql:delete from advert_keys t where t.id = ? and t.name = ?
	 *         params: Object[][] objs = new Object[][]; Object[] obj1 = new
	 *         Object[]{1,zhangsan}, Object[] obj1 = new Object[]{2,lisi},
	 *         objs[0] = obj1;objs[0] = obj2;
	 */
	public int[] batchDelete(Connection conn, String sql, Object[][] params) {
		return batch(conn, sql, params);
	}

	/**
	 * 批量保存
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int[] batchInsert(String sql, Object[][] params) {
		return batch(sql, params);
	}
	
	/**
	 * 批量保存
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int[] batchInsert(Connection conn, String sql, Object[][] params) {
		return batch(conn, sql, params);
	}

	/**
	 * 批量修改
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int[] batchUpdateForConn(String sql, Object[][] params) {
		return batchForConn(sql, params);
	}

	/**
	 * 批量删除
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int[] batchDeleteForConn(String sql, Object[][] params) {
		return batchForConn(sql, params);
	}

	/**
	 * 批量保存
	 * 
	 * @param sql
	 * @param params
	 * @return
	 */
	public int[] batchInsertForConn(String sql, Object[][] params) {
		return batchForConn(sql, params);
	}

	public int callProc(String sql) {
		qr = new QueryRunner(ds);
		int rows = 0;
		try {
			rows = qr.update(sql);
		} catch (SQLException e) {
			logger.error("Jdbc exception for callProc method:" + e, e);
		}
		return rows;
	}
	
	public int callProc(Connection conn, String sql) {
		qr = new QueryRunner();
		int rows = 0;
		try {
			rows = qr.update(conn, sql);
		} catch (SQLException e) {
			logger.error("Jdbc exception for callProc method:" + e, e);
		}
		return rows;
	}

	public <T> void insert(T t) {

		this.insert(null, t);

	}
	
	@SuppressWarnings("unchecked")
	public <T> void insert(Connection conn, T t) {

		// 获取对象t的Class对象
		Class<T> clazz = (Class<T>) t.getClass();

		// 获取表名
		Table table = (Table) clazz.getAnnotation(Table.class);
		String tableName = table.name();

		// 组拼sql语句
		StringBuffer sql = new StringBuffer("insert into " + tableName + "(");
		StringBuffer sqlValues = new StringBuffer("values(");
		List<Object> params = new ArrayList<Object>();

		Method[] ms = clazz.getDeclaredMethods();
		for (Method m : ms) {
			// 获取方法上的注解
			Column column = m.getAnnotation(Column.class);
			if (column != null) {

				sql.append(column.name()).append(",");
				sqlValues.append("?,");
				try {
					params.add(m.invoke(t));
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
			}
		}
		if (sql.indexOf(",") != -1) {
			sql.setLength(sql.length() - 1);
		}
		sql.append(") ");

		if (sqlValues.indexOf(",") != -1) {
			sqlValues.setLength(sqlValues.length() - 1);
		}
		sqlValues.append(")");

		sql.append(sqlValues);

		if(conn != null){
			this.insert(conn, sql.toString(), params.toArray());
		}else{
			this.insert(sql.toString(), params.toArray());
		}
	}
	
	public <T> void batchInsert(Class<T> clazz, List<T> list) {
		
		this.batchInsert(null, clazz, list);

	}
	
	@SuppressWarnings("unchecked")
	public <T> void batchInsert(Connection conn, Class<T> clazz, List<T> list) {
		
		// 获取表名
		Table table = (Table) clazz.getAnnotation(Table.class);
		String tableName = table.name();

		// 组拼sql语句
		StringBuffer sql = new StringBuffer("insert into " + tableName + "(");
		StringBuffer sqlValues = new StringBuffer("values(");

		Method[] ms = clazz.getDeclaredMethods();
		
		int columnLength = 0;
		for (Method m : ms) {
			// 获取方法上的注解
			Column column = m.getAnnotation(Column.class);
			if (column != null) {

				sql.append(column.name()).append(",");
				sqlValues.append("?,");
				
				columnLength ++;
			}
		}
		if (sql.indexOf(",") != -1) {
			sql.setLength(sql.length() - 1);
		}
		sql.append(") ");

		if (sqlValues.indexOf(",") != -1) {
			sqlValues.setLength(sqlValues.length() - 1);
		}
		sqlValues.append(")");

		sql.append(sqlValues);
		
		//封装sql的参数值
		Object[][] sqlParams = new Object[list.size()][columnLength];
		int index = 0;
		for(T t : list){
			
			// 获取对象t的Class对象
			Class<T> clazz2 = (Class<T>) t.getClass();

			List<Object> params = new ArrayList<Object>();
			
			Method[] ms2 = clazz2.getDeclaredMethods();
			for (Method m : ms2) {
				// 获取方法上的注解
				Column column = m.getAnnotation(Column.class);
				if (column != null) {

					try {
						params.add(m.invoke(t));
					} catch (IllegalAccessException e) {
						e.printStackTrace();
					} catch (IllegalArgumentException e) {
						e.printStackTrace();
					} catch (InvocationTargetException e) {
						e.printStackTrace();
					}
				}
			}
			sqlParams[index ++] = params.toArray();
		}
		
		if(conn != null){
			this.batchInsert(conn, sql.toString(), sqlParams);
		}else{
			this.batchInsert(sql.toString(), sqlParams);
		}

	}
	
	public static void main(String[] args) throws SQLException {
		
		
		SqlUtil sqlUtil = new SqlUtil(PropertiesUtil.getValue("url"),PropertiesUtil.getValue("username"),PropertiesUtil.getValue("password"));
		
		logger.info("aaa");
		sqlUtil.insert(JDBCUtils.getConnection(), "insert into new_table (a, b) select title,content from bi_base_advise", new Object[]{});
		logger.info("bbb");
		sqlUtil.insertForConn("insert into new_table (a, b) select title,content from bi_base_advise");
		logger.info("ccc");
	}

}