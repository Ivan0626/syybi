<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ include file="/include/taglib.jsp"%>		
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en" class="login-alone">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- 
<script type="text/javascript" charset="utf-8" async="" src="${pageContext.request.contextPath}/index/about/crmqq.php"></script>
<script type="text/javascript" charset="utf-8" async="" src="${pageContext.request.contextPath}/index/about/contains.js"></script>
<script type="text/javascript" charset="utf-8" async="" src="${pageContext.request.contextPath}/index/about/localStorage.js"></script>
<script type="text/javascript" charset="utf-8" async="" src="${pageContext.request.contextPath}/index/about/Panel.js"></script>
<script type="text/javascript" async="" src="${pageContext.request.contextPath}/index/about/ga.js"></script>
 -->
 
<link rel="shortcut icon" href="${pageContext.request.contextPath}/images/favicon.ico">
<script type="text/javascript">
	var _speedMark = new Date();
</script>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>关于我们-电商指数</title>
<meta name="author" content="深圳三眼鱼科技有限公司">
<meta name="keywords" content="电商指数,淘宝数据分析,行业分析,品牌分析,直通车分析,顾客分析,数据魔方,淘宝数据统计,淘宝竞争对手分析,天猫行业调研">
<meta name="description" content="我发现一个非常好用的电商数据分析平台：电商指数 我用过感觉非常不错，你也来试试吧！点此链接注册送额外大礼包哦！">
<meta name="copyright" content="粤ICP备14080510号. © 2015 SANYANYU. All Rights Reserved.">
<meta name="renderer" content="webkit">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<link type="text/css" rel="stylesheet" href="${pageContext.request.contextPath}/index/about/index.css">

<!-- Google Analysis
<script type="text/javascript">
	var _gaq = _gaq || [];
	_gaq.push([ '_setAccount', 'UA-34476838-1' ]);
	_gaq.push([ '_trackPageview' ]);

	(function() {
		var ga = document.createElement('script');
		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ? 'https://ssl'
				: 'http://www')
				+ '.google-analytics.com/ga.js';
		ga.src = "http://www.ebindex.com/public/js/ga.js";
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(ga, s);
	})();
</script>
end of Google Analysis -->
</head>
<body>
	<div class="header">
		<h1 style="display: none;">深圳三眼鱼科技有限公司</h1>
		<div class="container">
			<div id="logo" class="pull-left">
				<a href="${pageContext.request.contextPath}/f/Index"><img src="${pageContext.request.contextPath}/index/main/logo.png"></a>
			</div>
			<div class="pull-right">
				<c:if test="${user != null }">
					<a class="go-in btn" style="margin-top: 13px;" href="${pageContext.request.contextPath}/pages/main.jsp">进入应用</a>
				</c:if>
				<c:if test="${user == null }">
					<a class="login btn" href="${pageContext.request.contextPath}/index/login.jsp">登录</a>
					<a class="reg btn" href="${pageContext.request.contextPath}/index/register.jsp">注册</a>
				</c:if>
			</div>

			<div id="nav" class="pull-right">
				<ul>
					<li class="nav1 nav-li"><a href="${pageContext.request.contextPath}/f/Index">首页</a>
					</li>
					<!-- 
					<li class="nav2 nav-li"><a href="http://www.ebindex.com/picture">信息图</a>
					 -->
					</li>
					<li class="nav3 nav-li"><a href="${pageContext.request.contextPath}/f/Plan">套餐价格</a>
					</li>
					<li class="nav4 nav-li"><a class="active"
						href="${pageContext.request.contextPath}/index/about.jsp">关于我们</a></li>
				</ul>

			</div>
		</div>
	</div>
	<div class="mainer">
		<style type="text/css">
.slide-img {
	width: 50%;
	float: left;
}
</style>
		<div class="about-banner">
			<a href="javascript:void(0);" class="slide-icon" id="slide-prev">‹</a>
			<a href="javascript:void(0);" class="slide-icon" id="slide-next">›</a>
			<div id="slide-box" style="margin-left: 0px;">


				<img class="slide-img" src="${pageContext.request.contextPath}/index/about/11.jpg"><img
					class="slide-img" src="${pageContext.request.contextPath}/index/about/12.jpg">
			</div>
		</div>
		<div class="row-bordered">
			<div class="container">
				<div id="nav-about">
					<ul>
						<li class="nav-li active" value="us"><a
							href="javascript:void(0)">关于我们</a></li>
						<li class="nav-li" value="recruit"><a
							href="javascript:void(0)">加入我们</a></li>
						<li class="nav-li" value="contact"><a
							href="javascript:void(0)">联系我们</a></li>
						<li class="nav-li" value="terms"><a href="javascript:void(0)">服务条款</a></li>
					</ul>
					<div id="about-active"
						style="margin-left: 0px; width: 144px; overflow: hidden;"></div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="container">
				<div class="about-content tab-content active" id="us">
					<p class="paragraph">电商指数是一个外部数据分析平台，帮助商家掌握行业趋势，了解竞争对手的状况等。</p><br>
					<p class="paragraph">深圳三眼鱼科技有限公司是一家大数据(Hadoop,Spark等)技术的中国企业，开展有大数据相关的基础软件平台，应用，解决方案，大数据培训等业务。公司在业界有广泛的渠道和合作渠道,服务客户 有金融，银行，保险，互联网，电商等拥有大数据的企业，客户主要分布于北京，上海，广州，深圳等地区。</p><br>
					<p class="paragraph">三眼鱼以TDP Enterprise 企业版（三眼鱼大数据平台）为基础，在这个平台上构建相应的分析应用程序,基于非结构化数据库技术构建互联网分析系统，基于实时分析查询技术构建商业智能数据工厂系统。</p>
				</div>
				<div class="about-content tab-content" id="recruit">
					<p style="text-align: left;color: #ff0000;">寻找来自地球的你，We want you!--来自三眼鱼的我们</p>

					<p>If you're offered a seat on a rocket ship, don't ask what seat. Just get on. --Sheryl Sandberg</p>
					
					<p style="text-align: left;color: #ff0000;">关键词：大数据；崭新的行业；员工期权；有竞争力的薪酬。</p>
					
					<p>三眼鱼科技是致力于大数据基础软件研发的初创企业，公司推出的一站式Hadoop发行版Fusion Data Platform持续保持在该领域的技术领先优势；有众多项目落地；我们为员工提供极富吸引力的薪酬，同时还能获得员工期权，让你成为公司的主人翁之一。</p>
					
					<p style="text-align: left;">如果你初出茅庐，充满激情，那么来吧，三眼鱼给你舞台。</p>
					
					<p style="text-align: left;">如果你向往挑战，不安现状，那么来吧，三眼鱼给你改变。</p>
					
					<p style="text-align: left;">这里有一群风趣幽默的小伙伴，能帮助你迅速新技能</p>
					
					<p style="text-align: left;">与其羡慕来自星星的他，不如做来自三眼鱼的你！</p>
					
					<p style="text-align: left;">公司现在处于飞速发展中，由于业务需要每个岗位都需要更多的精英加盟， 无论你喜欢从大处着手（我们的系统需要处理上P的数据）还是从小处提高 （我们调整性能需要从毫秒入手）， 喜欢做底层技术（Spark, Shark, HBase, Hive, HDFS，JVM调优）还是做美丽的界面（HTML, CSS, AngularJS）， 抑或你是一个传说中的Full Stack Engineer，在这里都能找到你的位置。</p>
					
					<p style="text-align: left;">你准备好了吗?</p>
					
					<div class="grey-board">
						<div id="recruit-board">
							<!--
                    <div id="recruit-list">
                        <ul>
                            <li class="list-li"><a href="javascript:void(0);">攻城狮</a></li>
                            <li class="list-li"><a href="javascript:void(0);">程序猿</a></li>
                            <li class="list-li"><a href="javascript:void(0);">射鸡尸</a></li>
                        </ul>
                    </div>
                    <div id="recruit-content">
                        <div class="recruit-detail tab-content">
                            <h2>攻城狮</h2>
                            <br/>
                            <br/>
                            <h3>岗位职责</h3>
                            <br/>
                            <p>1、 负责大型数据仓库的开发；</p>
                            <p>2、 负责数据挖掘系统开发；</p>
                            <p>3、 在精英团队中工作，提供充分的个人发展空间。</p>
                            <br/>
                            <br/>
                            <h3>职位要求</h3>
                            <br/>
                            <p>1、全日制本科及以上学历，计算机相关专业应届及在校生；</p>
                            <p>2、英语四级及以上，一周能保证4-5天全职工作时间；</p>
                            <p>3、熟悉Linux/Unix环境； </p>
                        </div>
                        <div class="recruit-detail tab-content">
                            <h2>程序猿</h2>
                        </div>
                        <div class="recruit-detail tab-content">
                            <h2>射鸡尸</h2>
                        </div>
                    </div>
                    <div class="clear-both"></div>
                    -->
							<div>
								<p class="paragraph">
									我们可以提供难得的创业经历，宽松灵活的工作环境，小而精的团队。你将参与并见证每一个产品的诞生，每个人的意见都得到重视。你做的工作位于互联网的创新前沿，可能对整个行业的发展产生影响。
								</p>
								<p class="paragraph">有兴趣或者问题请email至
									hr@sanyanyu.com。你可以用任何方式介绍自己，比如制作一个在线简历或者附上自己认为最成功的项目。</p>
							</div>
						</div>
					</div>
				</div>
				<div class="about-content tab-content" id="contact">
					<p class="paragraph">客服电话：0755-84164626</p>
					<p class="paragraph">客服邮箱：contact@sanyanyu.com</p>
					<p class="paragraph">公司地址：深圳市龙岗区坂田五和大道和布龙路交汇处（地铁5号线五和站B出口）</p>
					<p class="paragraph">办公时间：周一至周五 9:00-18:00</p>
				</div>
				<div class="about-content tab-content" id="terms">
					<div class="grey-board" id="terms">
						<center>
							<h3>电商指数产品服务条款</h3>
						</center>
						<h4>一、接受条款</h4>
						<ol>
							<li>欢迎使用平台。本服务条款是用户（您）与深圳三眼鱼科技有限公司（下称三眼鱼科技）之间的协议。</li>
							<li>ebindex.com由三眼鱼科技或其关联公司所运行的各个网站和网页（合称ebindex.com）构成。三眼鱼科技将根据以下服务条款为您提供服务。</li>
							<li>这些条款可由三眼鱼科技随时更新，且毋须另行通知。三眼鱼科技服务条款(以下简称本“服务条款”)一旦发生变动,
								我们将在网页上公布修改内容。修改后的服务条款一旦在网页上公布即有效代替原来的服务条款。您可随时造访http://www.ebindex.com/about查阅最新版服务条款。</li>
							<li>目前经由其产品服务组合，向用户提供丰富的网上及线下资源及诸多产品与服务（以下简称“服务”或“本服务”）。此外，当您使ebindex.com所提供的特殊服务时，您和三眼鱼科技应遵守三眼鱼科技随时公布的与该服务相关的指引和规则。前述所有的指引和规则，均构成本服务条款的一部分。</li>
							<li>您在使用三眼鱼科技提供的各项服务之前，应仔细阅读本服务条款。如您不同意本服务条款及/或随时对其的修改，您可以主动取消三眼鱼科技提供的服务；您一旦使用三眼鱼科技提供的服务，即视为您已了解并完全同意本服务条款各项内容，包括三眼鱼科技对服务条款随时所做的任何修改，并成为三眼鱼科技用户（以下简称“用户”）。</li>
						</ol>
						<h4>二、用户使用规则:</h4>
						<ol>
							<li>用户必须自行配备上网和使用电信增值业务所需的设备，自行负担个人上网或第三方（包括但不限于电信或移动通信提供商）收取的通讯费、信息费等有关费用。如涉及电信增值服务的，我们建议您与您的电信增值服务提供商确认相关的费用问题。</li>
							<li>除您与三眼鱼科技另有约定外，您同意本服务仅供个人使用且非商业性质的使用，您不可对本服务任何部分或本服务之使用或获得，进行复制、拷贝、出售、或利用本服务进行广告、或用于其他商业目的，其中，您不得将任何广告信函与信息、促销资料、垃圾邮件与信息、滥发邮件与信息、直销及传销邮件与信息以短信、即时通信或以其他方式张贴传送，但三眼鱼科技对特定服务另有适用指引或规则的除外。</li>
							<li>不得发送任何妨碍社会治安或非法、虚假、骚扰性、侮辱性、恐吓性、伤害性、破坏性、挑衅性、淫秽色情性等内容的信息。</li>
							<li>
								保证自己在使用各服务时用户身份的真实性和正确性及完整性，如果资料发生变化，您应及时更改。在安全完成本服务的登记程序并收到一个密码及帐号后，您应维持密码及帐号的机密安全。您应对任何人利用您的密码及帐号所进行的活动负完全的责任，三眼鱼科技无法对非法或未经您授权使用您帐号及密码的行为作出甄别，因此三眼鱼科技不承担任何责任。在此，您同意并承诺做到∶
								当您的密码或帐号遭到未获授权的使用，或者发生其他任何安全问题时，您会立即有效通知到三眼鱼科技；且当您每次上网或使用其他服务完毕后，会将有关帐号安全退出。
								<ol>
									<li>用户同意接受三眼鱼科技通短信、电子邮件、即时通信的客户端、网页或其他合法方式向用户发送商品促销或其他相关商业信息。在使用电信增值服务的情况下，用户同意接受本公司及合作公司通过增值服务系统或其他方式向用户发送的相关服务信息或其他信息，其他信息包括但不限于通知信息、宣传信息、广告信息等。</li>
									<li>关于在三眼鱼科技张贴的公开信息：<br>您同意您在本服务公开使用区域或服务项目内张贴之内容，包括但不限于照片、图形或影音资料等内容，授予三眼鱼科技全球性、免许可费、非独家、可完全转授权、及永久有效的使用权利，三眼鱼科技可以为了展示、散布及推广张贴前述内容之特定目的，将前述内容复制、修改、改写、改编或出版使用。<br>对您张贴的内容，您保证已经拥有必要权利或授权以进行该内容提供、张贴、上载、提交等行为。<br>若您违反有关法律法规及本服务条款的规定了，须自行承担完全的法律责任，并承担因此给三眼鱼科技造成的损失的法律责任。
									</li>
								</ol>
							</li>
						</ol>
						<h4>三、服务风险及免责声明</h4>
						<ol>
							<li>用户须明白，本服务仅依其当前所呈现的状况提供，本服务涉及到互联网及移动通讯等服务，可能会受到各个环节不稳定因素的影响。因此服务存在因上述不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险。开通服务的用户须承担以上风险，本公司和合作公司对服务之及时性、安全性、准确性不作担保，对因此导致用户不能发送和接受阅读消息、或传递错误，个人设定之时效、未予储存或其他问题不承担任何责任。</li>
							<li>如本公司的系统发生故障影响到本服务的正常运行，本公司承诺在第一时间内与相关单位配合，及时处理进行修复。但用户因此而产生的经济损失，本公司和合作公司不承担责任。此外，三眼鱼科技保留不经事先通知为维修保养、升级或其他目的暂停本服务任何部分的权利。</li>
							<li>三眼鱼科技在此郑重提请您注意，任何经由本服务以上载、张贴、发送即时信息、电子邮件或任何其他方式传送的资讯、资料、文字、软件、照片、图形、视讯、信息、用户的登记资料或其他资料（以下简称“内容”），无论系公开还是私下传送，均由内容提供者承担责任。三眼鱼科技无法控制经由本服务传送之内容，也无法对用户的使用行为进行全面控制，因此不保证内容的合法性、正确性、完整性、真实性或品质；您已预知使用本服务时，可能会接触到令人不快、不适当或令人厌恶之内容，并同意将自行加以判断并承担所有风险，而不依赖于三眼鱼科技。但在任何情况下，三眼鱼科技有权依法停止传输任何前述内容并采取相应行动，包括但不限于暂停用户使用本服务的全部或部分，保存有关记录，并向有关机关报告。但三眼鱼科技有权(但无义务)</li>
							<li>依其自行之考量，拒绝和删除可经由本服务提供之违反本条款的或其他引起三眼鱼科技或其他用户反感的任何内容。</li>
							<li>关于使用及储存之一般措施：您承认关於本服务的使用三眼鱼科技有权制订一般措施及限制，包含但不限於本服务将保留用户信息、电子邮件信息、所张贴内容或其他上载内容之最长期间、本服务帐号权限、三眼鱼科技服务器为您分配的最大使用空间，以及一定期间内您使用本服务之次数上限（及每次使用时间之上限）。通过本服务存储或传送之任何信息、通讯资料和其他内容，如被删除或未予储存，您同意三眼鱼科技毋须承担任何责任。您亦同意，长时间未使用的非付费或无余额帐号，三眼鱼科技有权关闭并收回帐号并删除用户信息、电子邮件信息、所张贴内容或其他上载内容。您也同意，三眼鱼科技有权依其自行之考量，不论通知与否，随时变更这些一般措施及限制。</li>
							<li>与广告商进行之交易:
								您通过本服务与广告商进行任何形式的通讯或商业往来，或参与促销活动，包含相关商品或服务之付款及交付，以及达成的其他任何相关条款、条件、保证或声明，完全为您与广告商之间之行为。除有关法律有明文规定要求三眼鱼科技承担责任以外，您因前述任何交易或前述广告商而遭受的任何性质的损失或损害，三眼鱼科技均不予负责。</li>
							<li>链接及搜索引擎服务：本服务或第三人可提供与其他国际互联网上之网站或资源之链接。由於三眼鱼科技无法控制这些网站及资源，您了解并同意：无论此类网站或资源是否可供利用，三眼鱼科技不予负责；三眼鱼科技亦对存在或源于此类网站或资源之任何内容、广告、产品或其他资料不予保证或负责。因您使用或依赖任何此类网站或资源发布的或经由此类网站或资源获得的任何内容、商品或服务所产生的任何损害或损失，三眼鱼科技不负任何直接或间接之责任。若您认为该链接所载的内容或搜索引擎所提供之链接的内容侵犯您的权利，三眼鱼科技声明与上述内容无关，不承担任何责任。三眼鱼科技建议您与该网站或法律部门联系，寻求法律保护；若您需要更多了解三眼鱼科技之搜索服务，请参见三眼鱼科技关于搜索引擎服务的相关说明。</li>
						</ol>
						<h4>四、服务变更、中断或终止及服务条款的修改</h4>
						<ol>
							<li>本服务的所有权和运作权、一切解释权归三眼鱼科技。三眼鱼科技提供的服务将按照其发布的章程、服务条款和操作规则严格执行。</li>
							<li>三眼鱼科技有权在必要时修改服务条款，服务条款一旦发生变动，将会在相关页面上公布修改后的服务条款。如果不同意所改动的内容，用户应主动取消此项服务。如果用户继续使用服务，则视为接受服务条款的变动。</li>
							<li>本公司和合作公司有权按需要修改或变更所提供的收费服务、收费标准、收费方式、服务费、及服务条款。三眼鱼科技提供的免费服务，可能现在或日后对部分免费服务的用户开始收取一定的费用，如用户拒绝支付该等费用，则不能在收费开始后继续使用相关的服务。但三眼鱼科技和合作公司将尽最大努力通过电邮或其他有效方式通知用户有关的修改或变更。</li>
							<li>本公司特别提请用户注意，本公司为了保障公司业务发展和调整的自主权，本公司拥有经或未经事先通知而修改服务内容、中断或中止部分或全部服务的权利，修改会公布于三眼鱼科技网站相关页面上，一经公布视为通知。三眼鱼科技行使修改或中断服务的权利而造成损失的，三眼鱼科技不需对用户或任何第三方负责。</li>
							<li>如发生下列任何一种情形，本公司有权随时中断或终止向用户提供服务而无需通知用户：
								<ul>
									<li>用户提供的个人资料不真实；</li>
									<li>用户违反本服务条款的规定；</li>
									<li>按照主管部门的要求；</li>
									<li>其他本公司认为是符合整体服务需求的特殊情形。</li>
								</ul>
							</li>
						</ol>
						<h4>五、隐私权保护</h4>
						<ol>
							<li>三眼鱼科技重视对用户隐私的保护，保护隐私是三眼鱼科技的一项基本政策。您提供的登记资料及三眼鱼科技公司保留的有关您的若干其他个人资料将受到中国有关隐私的法律和本公司《隐私保护声明》之规范。请访问http://www.ebindex.com/about查阅三眼鱼科技完整的隐私权政策。</li>
							<li>您使用三眼鱼科技服务时，三眼鱼科技有权用数字代码、通用唯一标识符、cookies或其他技术确定进入服务的计算机。三眼鱼科技有可能利用所得信息对服务的使用进行总体性及匿名的数据统计及分析，所得数据可供或其合作人使用。计算机识别术也会用于执行相关的服务条款。</li>
							<li>三眼鱼科技可能会与第三方合作向用户提供相关的服务，如该第三方为合法经营的公司且提供同等的用户隐私保护（如电信运营商），三眼鱼科技有权将用户的注册资料等提供给该第三方。</li>
						</ol>
						<h4>六、三眼鱼科技商标信息</h4>
						<ol>
							<li>ebindex.com，以及其他三眼鱼科技标志及产品、服务名称，均为三眼鱼科技公司之商标（以下简称“三眼鱼科技标识”）。未经三眼鱼科技事先书面同意，您不得将三眼鱼科技标记以任何方式展示或使用或作其他处理，也不得向他人表明您有权展示、使用、或其他有权处理三眼鱼科技标识的行为。</li>
						</ol>
						<h4>七、信息内容的所有权</h4>
						<ol>
							<li>本公司定义的信息内容包括：文字、软件、声音、相片、录像、图表；网页；广告中全部内容；本公司为用户提供的商业信息。所有这些内容受版权、商标权、和其它知识产权和所有权法律的保护。所以，用户只能在本公司和相关权利人授权下才能使用这些内容，而不能擅自使用、抄袭、复制、修改、编撰这些内容、或创造与内容有关的衍生产品。</li>
							<li>关于三眼鱼科技提供的软件：您了解并同意，本服务及本服务所使用或提供之相关软件（以下简称“软件”）（但不包括两用户之间直接传递的资料）是由三眼鱼科技拥有所有相关知识产权及其他法律保护之专有之知识产权（包括但不限于版权、商标权、专利权、及商业秘密）资料。若就某一具体软件存在单独的最终用户软件授权协议，您除应遵守本协议有关规定外，亦应遵守该软件授权协议。
								除非您亦同意该软件授权协议，否则您不得安装或使用该软件。对于未提供单独的软件授权协议的软件，除您应遵守本服务协议外，三眼鱼科技或所有权人仅将为您个人提供可取消、不可转让、非专属的软件授权许可，并仅为访问或使用本服务之目的而使用该软件。此外，在任何情况下，未经三眼鱼科技明示授权，您均不得修改、出租、出借、出售、散布本软件之任何部份或全部，或据以制作衍生著作，或使用擅自修改后的软件，或进行还原工程、反向编译，或以其他方式发现原始编码，包括但不限於为了未经授权而使用本服务之目的。您同意将通过由三眼鱼科技所提供的界面而非任何其他途径使用本服务。</li>
						</ol>
						<h4>八、法律</h4>
						<ol>
							<li>本服务条款要与国家相关法律、法规一致，如发生服务条款与相关法律、法规条款有相抵触的内容，抵触部分以法律、法规条款为准。</li>
						</ol>
						九、保障
						<ol>
							<li>用户同意保障和维护本公司全体成员的利益，负责支付由用户使用超出服务范围引起的一切费用（包括但不限于：律师费用、违反服务条款的损害补偿费用以及其它第三人使用用户的电脑、帐号和其它知识产权的追索费）。</li>
							<li>用户须对违反国家法律规定及本服务条款所产生的一切后果承担法律责任。</li>
						</ol>
						<h4>十、其他</h4>
						<ol>
							<li>如本服务条款中的任何条款无论因何种原因完全或部分无效或不具有执行力，本服务条款的其余条款仍应有效且具有约束力，并且努力使该规定反映之意向具备效力。</li>
							<li>本服务条款构成您与三眼鱼科技之全部协议，规范您对本服务之使用，并取代您先前与三眼鱼科技达成的全部协议。但在您使用相关服务、或使用第三方提供的内容或软件时，亦应遵从所适用之附加条款及权利。</li>
							<li>每项服务的内容、收费标准、收费方式、服务费及服务条款应以最后发布的通知为准。</li>
							<li>用户对服务之任何部分或本服务条款的任何部分之意见及建议可通过客户服务部门与三眼鱼科技联系，客服联系方式:contact@sanyanyu.com。</li>
						</ol>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer">
		<div class="container">
			<h2>
				<span class="font40"></span><span class="font14">三眼鱼科技旗下产品</span>
			</h2>
			<div id="ibbd-products">
				<ul>
					<li class="foo-li">
						<h3>电商指数</h3>
						<ul>
							<li><a href="${pageContext.request.contextPath}/index/about.jsp#us">关于我们</a></li>
							<li><a href="${pageContext.request.contextPath}/index/about.jsp#recruit">诚聘英才</a></li>
							<li><a href="${pageContext.request.contextPath}/index/about.jsp#terms">服务条款</a></li>
							<li><a href="${pageContext.request.contextPath}/index/about.jsp#contact">联系我们</a></li>
						</ul>
					</li>
					<li class="foo-li">
						<h3>产品服务</h3>
						<ul>
							<li><a href="${pageContext.request.contextPath}/f/Index">电商指数</a></li>
						</ul>
					</li>
					<li class="foo-li">
						<h3>咨询反馈</h3>
						<ul>
							<li><a class="right12" target="_blank"
								href="${pageContext.request.contextPath}/a/AdviseServlet?method=init">提建议</a>
							</li>
						</ul>
					</li>
				</ul>
			</div>
			<div id="ibbd-wechat">
				<img class="bottom20" src="${pageContext.request.contextPath}/index/about/qrcode.png">
				<p>微信扫描添加公众平台，</p>
				<p>并发送注册邮箱帐号。</p>
			</div>
			<div class="clear-both">
				<p id="copy-right">
					<a href="http://www.miitbeian.gov.cn">粤ICP备14080510号</a>. © 2015 SANYANYU. All Rights Reserved.
				</p>

			</div>
		</div>
	</div>
	
	<script type="text/javascript" src="${pageContext.request.contextPath}/js/jquery-1.11.1.min.js" charset="UTF-8"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/index/about/ibbd-class2.js" charset="UTF-8"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath}/index/about/about.js" charset="UTF-8"></script>
	<!-- JiaThis Button BEGIN -->
	<script type="text/javascript" src="http://v3.jiathis.com/code/jiathis_r.js?type=left&amp;move=0&amp;btn=l1.gif" charset="utf-8"></script>
	<!-- JiaThis Button END -->
</body>
</html>