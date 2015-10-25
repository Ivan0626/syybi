package com.sanyanyu.syybi.utils;

import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSourceFactory;

public class JDBCUtils {
	private static DataSource ds;
	
	//add by lcy
	private static ThreadLocal<Connection> tl = new ThreadLocal<Connection>();  //map
	
	static{
		try{
			Properties prop = new Properties();
			InputStream in = JDBCUtils.class.getClassLoader().getResourceAsStream("dbcpconfig.properties");
			prop.load(in);
			
			ds = BasicDataSourceFactory.createDataSource(prop);
		}catch (Exception e) {
			throw new ExceptionInInitializerError(e);
		}
	}
	
	public static DataSource getDataSource(){
		return ds;
	}
	
	public static Connection getConnection() throws SQLException{
		try{
			//得到当前线程上绑定的连接
			Connection conn = tl.get();
			if(conn==null){  //代表线程上没有绑定连接
				conn = ds.getConnection();
				tl.set(conn);
			}
			return conn;
		}catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	
	public static void startTransaction(){
		try{
			//得到当前线程上绑定连接开启事务
			Connection conn = tl.get();
			if(conn==null){  //代表线程上没有绑定连接
				conn = ds.getConnection();
				tl.set(conn);
			}
			conn.setAutoCommit(false);
		}catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	
	public static void commitTransaction(){
		try{
			Connection conn = tl.get();
			if(conn!=null){
				conn.commit();
			}
		}catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public static void rollbackTransaction(){
		try{
			Connection conn = tl.get();
			if(conn!=null){
				conn.rollback();
			}
		}catch (Exception e) {
			throw new RuntimeException(e);
		}
	}
	
	public static void closeConnection(){
		try{
			Connection conn = tl.get();
			if(conn!=null){
				conn.close();
			}
		}catch (Exception e) {
			throw new RuntimeException(e);
		}finally{
			tl.remove();   //千万注意，解除当前线程上绑定的链接（从threadlocal容器中移除对应当前线程的链接）
		}
	}
	
	public static void main(String[] args) throws SQLException {
		
//		JDBCUtils.startTransaction();
//		
//		try {
//			BaseTask baseTask = new BaseTask();
//			baseTask.setTskDescription("测试下事务2");
//			baseTask.setTskName("测试下事务2");
//			baseTask.setUid(1);
//			SqlUtil sqlUtil = new SqlUtil();
//			
//			sqlUtil.insert(JDBCUtils.getConnection(), baseTask);
//			int a = 1 / 0;
//			JDBCUtils.commitTransaction();
//		} catch (Exception e) {
//			e.printStackTrace();
//			JDBCUtils.rollbackTransaction();
//		}finally{
//			JDBCUtils.closeConnection();
//		}
//		SqlUtil sqlUtil = new SqlUtil(PropertiesUtil.getValue("mysql.url"),PropertiesUtil.getValue("mysql.username"),PropertiesUtil.getValue("mysql.password"));
//		
//		
//		Connection conn =  sqlUtil.getConn();
//		try {
//			conn.setAutoCommit(false);
//			
//			java.sql.Statement stmt = conn.createStatement();
//			
//			stmt.execute("insert into bi_base_task(uid, tsk_name, tsk_description) values(1, 'cccccc','测试')");
//			
//			conn.commit();
//		} catch (Exception e) {
//			e.printStackTrace();
//			conn.rollback();
//		}finally{
//			conn.close();
//		}
		
	}
}
