// ==UserScript==
// @name           Clean News Korea
// @namespace      secrice.com
// @description    Clean News without any AD!
// @version        0.1
// @grant          none
// @include        http://www.ajnews.co.kr/view_v2.jsp*
// @include        http://gold.asiae.co.kr/view.htm*
// @include        http://stoo.asiae.co.kr/news/stview.htm*
// @include        http://www.asiae.co.kr/news/view.htm*
// @include        http://www.asiatoday.co.kr/news/view.asp*
// @include        http://www.betanews.net/article/*
// @include        http://news.chosun.com/site/data/html_dir/*
// @include        http://review.chosun.com/site/data/html_dir/*
// @include        http://www.dailian.co.kr/news/news_view.htm*
// @include        http://www.ddaily.co.kr/news/news_view.php*
// @include        http://dkbnews.donga.com/Feed/*
// @include        http://news.donga.com/*
// @include        http://photo.donga.com/view.php*
// @include        http://sports.donga.com/*
// @include        http://starin.edaily.co.kr/news/NewsRead.edy*
// @include        http://www.edaily.co.kr/news/NewsRead.edy*
// @include        http://www.electimes.com/home/news/main/viewmain.jsp*
// @include        http://www.etnews.com/news/*
// @include        http://www.etoday.co.kr/news/section/newsview.php*
// @include        http://www.fnnews.com/view*
// @include        http://www.hani.co.kr/arti/*
// @include        http://*.hankooki.com/lpage/*
// @include        http://www.hankyung.com/news/app/newsview.php*
// @include        http://www.imaeil.com/sub_news/sub_news_view.php*
// @include        http://view.heraldm.com/view.php*
// @include        http://imnews.imbc.com/replay/*
// @include        http://*.inews24.com/php/news_view.php*
// @include        http://www.jejusori.net/news/articleView.html*
// @include        http://news.kbs.co.kr/*
// @include        http://news.khan.co.kr/kh_news/khan_art_view.html*
// @include        http://sports.khan.co.kr/news/sk_index.html*
// @include        http://www.kookje.co.kr/news2011/asp/newsbody.asp*
// @include        http://www.mediatoday.co.kr/news/articleView.html*
// @include        http://artsnews.mk.co.kr/news/*
// @include        http://news.mk.co.kr/*/view.php*
// @include        http://nnews.mk.co.kr/newsRead.php*
// @include        http://star.mk.co.kr/v2/view.php*
// @include        http://www.munhwa.com/news/view.html*
// @include        http://star.mt.co.kr/stview.php*
// @include        http://www.mydaily.co.kr/news/read.html*
// @include        http://www.newspim.com/view.jsp*
// @include        http://www.pressian.com/article/article.asp*
// @include        http://news.sbs.co.kr/section_news/news_read.jsp*
// @include        http://news.sbs.co.kr/sports/section_sports/sports_read.jsp?*
// @include        http://www.seoul.co.kr/news/newsView.php*
// @include        http://www.sisapress.com/news/articleView.html*
// @include        http://news.sportsseoul.com/read/*
// @include        http://www.yonhapnews.co.kr/*
// @include        http://www.ytn.co.kr/_*n/*
// @include        http://www.ytn.co.kr/photo/*
// @include        http://www.zdnet.co.kr/news/news_view.asp*
// @include        http://www.ohmynews.com/NWS_Web/View/at_pg.aspx*
// ==/UserScript==

var $;

var subject;
var date;
var content;
var url;

// Add jQuery.
(function(){
	console.log("Add jQuery");
	if (typeof unsafeWindow.jQuery == "undefined") {
		var GM_Head = document.getElementsByTagName("head")[0] || document.documentElement,
			GM_JQ = document.createElement("script");

		GM_JQ.src = "http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js";
		GM_JQ.type = "text/javascript";
		GM_JQ.async = true;

		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();
})();

// Check if jQuery"s loaded.
function GM_wait() {
	if (typeof unsafeWindow.jQuery == "undefined") {
		window.setTimeout(GM_wait, 100);
	} else {
		$ = unsafeWindow.jQuery.noConflict(true);
		letsJQuery();
	}
}

// All your GM code must be inside this function.
function letsJQuery() {
	console.log("JQuery Ready.");
	setTimeout(function(){
		console.log("Cleaning.");
		hideAllObjects();
		subject = $("title").html();

		// Check URL.
		url = document.location.href;
		if (url.search("star.mt.co.kr/stview.php") > 0)
			star_mt_co_kr();
		else if (url.search("www.newspim.com/view.jsp") > 0)
			www_newspim_com();
		else if (url.search("www.imaeil.com/sub_news/sub_news_view.php") > 0)
			www_imaeil_com();
		else if (url.search("www.ohmynews.com/NWS_Web/View/at_pg.aspx") > 0)
			www_ohmynews_com();
		else if (url.search("www.kookje.co.kr/news2011/asp/newsbody.asp") > 0)
			www_kookje_co_kr();
		else if (url.search("www.munhwa.com/news/view.html") > 0)
			www_munhwa_com();
		else if (url.search("nnews.mk.co.kr/newsRead.php") > 0)
			nnews_mk_co_kr();
		else if (url.search("www.asiatoday.co.kr/news/view.asp") > 0)
			www_asiatoday_co_kr();
		else if (url.search("sports.khan.co.kr/news/sk_index.html") > 0)
			sports_khan_co_kr();
		else if (url.search("www.betanews.net/article/") > 0)
			www_betanews_net();
		else if (url.search("www.pressian.com/article/article.asp") > 0)
			www_pressian_com();
		else if (url.search("www.electimes.com/home/news/main/viewmain.jsp") > 0)
			www_electimes_com();
		else if (url.search("www.etoday.co.kr/news/section/newsview.php") > 0)
			www_etoday_co_kr();
		else if (url.search("stoo.asiae.co.kr/news/stview.htm") > 0)
			stoo_asiae_co_kr();
		else if (url.search("www.dailian.co.kr/news/news_view.htm") > 0)
			www_dailian_co_kr();
		else if (url.search("www.mediatoday.co.kr/news/articleView.html") > 0)
			www_mediatoday_co_kr();
		else if (url.search("news.sportsseoul.com/read/") > 0)
			news_sportsseoul_com();
		else if (url.search("starin.edaily.co.kr/news/NewsRead.edy") > 0)
			starin_edaily_co_kr();
		else if (url.search("www.edaily.co.kr/news/NewsRead.edy") > 0)
			www_edaily_co_kr();
		else if (url.search("news.khan.co.kr/kh_news/khan_art_view.html") > 0)
			news_khan_co_kr();
		else if (url.search("www.jejusori.net/news/articleView.html") > 0)
			www_jejusori_net();
		else if (url.search("www.ddaily.co.kr/news/news_view.php") > 0)
			www_ddaily_co_kr();
		else if (url.search("www.seoul.co.kr/news/newsView.php") > 0)
			www_seoul_co_kr();
		else if (url.search("www.ajnews.co.kr/view_v2.jsp") > 0)
			www_ajnews_co_kr();
		else if (url.search("news.chosun.com/site/data/html_dir/") > 0)
			news_chosun_com();
		else if (url.search("news.kbs.co.kr/") > 0)
			news_kbs_co_kr();
		else if (url.search(".hankooki.com/lpage/") > 0)
			news_hankooki_com(); // news, economy
		else if (url.search("star.mk.co.kr/v2/view.php") > 0)
			star_mk_co_kr();
		else if (url.search("view.heraldm.com/view.php") > 0)
			view_heraldm_com();
		else if (url.search("www.hankyung.com/news/app/newsview.php") > 0)
			www_hankyung_com();
		else if (url.search("review.chosun.com/site/data/html_dir/") > 0)
			review_chosun_com();
		else if (url.search("imnews.imbc.com/replay/") > 0)
			imnews_imbc_com();
		else if (url.search("www.zdnet.co.kr/news/news_view.asp") > 0)
			www_zdnet_co_kr();
		else if (url.search("www.etnews.com/news/") > 0)
			www_etnews_com();
		else if (url.search("www.ytn.co.kr/_") > 0)
			www_ytn_co_kr();
		else if (url.search("www.ytn.co.kr/photo/") > 0)
			www_ytn_co_kr_photo();
		else if (url.search("dkbnews.donga.com/Feed/") > 0)
			dkbnews_donga_com();
		else if (url.search("www.fnnews.com/view") > 0)
			www_fnnews_com();
		else if (url.search("www.asiae.co.kr/news/view.htm")>0 || url.search("gold.asiae.co.kr/view.htm") > 0)
			www_asiae_co_kr(); // www, gold
		else if (url.search("www.sisapress.com/news/articleView.html") > 0)
			www_sisapress_com();
		else if (url.search("news.mk.co.kr/")>0 && url.search("/view.php") > 0)
			news_mk_co_kr();
		else if (url.search("photo.donga.com/view.php") > 0)
			photo_donga_com();
		else if (url.search("artsnews.mk.co.kr/news/") > 0)
			artsnews_mk_co_kr();
		else if (url.search("sports.donga.com/") > 0)
			sports_donga_com();
		else if (url.search("news.sbs.co.kr/s") > 0)
			news_sbs_co_kr(); // section_news, sports/section_sports
		else if (url.search("www.mydaily.co.kr/news/read.html") > 0)
			www_mydaily_co_kr();
		else if (url.search("www.hani.co.kr/arti/") > 0)
			www_hani_co_kr();
		else if (url.search("www.yonhapnews.co.kr/") > 0)
			www_yonhapnews_co_kr();
		else if (url.search("news.donga.com/") > 0)
			news_donga_com();
		else if (url.search(".inews24.com/php/news_view.php") > 0)
			news_inews24_com(); // news, joynews

		// Remove remaining elements.
		removeRemaining($("iframe,div#soeaFrame_,div#CmAdBody,script"), 1500);
	}, 500);
}

// star_mt_co_kr
function star_mt_co_kr()
{
	date = $("span.writer").html();
	content = $("div#textBody").html();
	
	show();
}

// www_newspim_com
function www_newspim_com()
{
	date = $("p.news_date").html();
	content = $("div.contents_body").html();
	
	show();
}

// www_imaeil_com
function www_imaeil_com()
{
	date = $("div#fontSzArea").parent().parent().next().next().find("td.txt2").html();
	content = $("div#fontSzArea.article").html();

	show();
}

// www_ohmynews_com
function www_ohmynews_com()
{
	date = $("div.info_data>div").html();
	content = $("div.at_contents").html();

	show();
}

// www_kookje_co_kr
function www_kookje_co_kr()
{
	date = $("div.news_reporterDate>ul>li").eq(1).html();
	content = $("div#news_textArea").html();

	show();
}

// www_munhwa_com
function www_munhwa_com()
{
	date = $("table[bgcolor='#F1F6F8']").find("td[align='right']").html();
	content = $("div#NewsAdContent").html();

	show();

	removeRemaining($("div#KL_LAYER_POP,form,img[style='display: none;']"), 500);
}

// nnews_mk_co_kr
function nnews_mk_co_kr()
{
	date = $("span.sm_num").html();
	content = $("div#artText").html();

	show();

	removeObject($("div#cleannews_content>div>p,strong"));
}

// mbn_mk_co_kr
function mbn_mk_co_kr()
{
}

// www_asiatoday_co_kr
function www_asiatoday_co_kr()
{
	date = $("td.ViewTimeText").html();
	content = $("div#_article").html();

	show();
}

// sports_khan_co_kr
function sports_khan_co_kr()
{
	date = $("div.article_date").html();
	content = $("div#NewsAdContent").html();

	show();
}

// www_betanews_net
function www_betanews_net()
{
	date = $("div#content_information").html();
	content = $("div#articleBody").html();

	show();
}

// www_pressian_com
function www_pressian_com()
{
	date = $("p.inputdate").html();
	content = $("div#newsBODY").html();

	show();

	removeObject($("div#cleannews_content>div"));
}

// www_electimes_com
function www_electimes_com()
{
	subject = ">>>" + $("td.bold03").html();
	date = $("td[height=25][align=right]").html();
	content = $("div#setViewBody").html();

	show();
}

// www_etoday_co_kr
function www_etoday_co_kr()
{
	subject = ">>>" + $("div#vtitle").html();
	date = $("div.colb.mart20").html();
	content = $("span#newsContent").html();

	show();
}

// stoo_asiae_co_kr
function stoo_asiae_co_kr()
{
	removeObject($("h3.title_article>img"));

	date = $("span.time").html();
	content = $("div.article").html();

	show();
}

// www_dailian_co_kr
function www_dailian_co_kr()
{
	date = $("div.h6").html();
	content = $("div#fade_ad_postion").html();

	show();
}

// www_mediatoday_co_kr
function www_mediatoday_co_kr()
{
	date = $("td[style=\"padding-right:10px;\"]").html();
	content = $("div#media_body").html();

	show();
}

// news_sportsseoul_com
function news_sportsseoul_com()
{
	removeObject($("div>ul#skyBanner").parent());

	date = $("li.dateText").html();
	content = $("div#content_area").html() + $("div#content_area2").html();

	show();

	removeDelayed("div#soeaLayerLoc_fi");
}

// starin_edaily_co_kr
function starin_edaily_co_kr()
{
	date = $("div.article_time").html();
	content = $("div#content").html();

	show();

	removeRemaining($("div#soeaLayerLoc_st"), 1000);
}

// www_edaily_co_kr
function www_edaily_co_kr()
{
	date = $("div.time").html();
	content = $("span#content").html();

	show();
}

// news_khan_co_kr
function news_khan_co_kr()
{
	removeObject($("ul"));

	date = $("div.article_date").html();
	content = $("div#sub_cntTop").html();

	show();
}

// www_jejusori_net
function www_jejusori_net()
{
	subject = ">>>" + $("td#font_title").html();
	date = $("span.SmN").html();
	content = $("div.articleBody").html();

	show();
}

// www_ddaily_co_kr
function www_ddaily_co_kr()
{
	removeObject($("div>ul"));

	subject = ">>>" + $("h2.top_title").html();
	date = $("div.author").html();
	content = $("div#body_article").html();

	show();
}

// www_seoul_co_kr
function www_seoul_co_kr()
{
	date = $("div.VCdate").html();
	content = $("div#atic_txt1").html();

	show();
}

// www_ajnews_co_kr
function www_ajnews_co_kr()
{
	subject = ">>>" + $("td.view_head").html();
	date = $("td.p8>table>tbody>tr>td").html();
	content = $("div.articleContent").html();

	show();
}

// news_chosun_com
function news_chosun_com()
{
	removeObject($("div#art_promotion,dl#art_btm_lang,h3,div#pop_videobox"));

	date = $("p#date_text").html();
	content = $("div.article").html();

	show();

	removeObject($("div#cleannews_content>div>p#date_text").parent());
}

// news_kbs_co_kr
function news_kbs_co_kr()
{
	subject = $("div#newsView>h2").html();
	date = $("p.newsUpload>em").html();
	content = $("div#newsContents").html();

	show();
}

// news_hankooki_com
function news_hankooki_com()
{
	date = $("div#Input_Time>dl>dd").html();
	content = $("div#GS_ContentGroup").html();

	show();
}

// star_mk_co_kr
function star_mk_co_kr()
{
	removeObject($("strong"));
	removeObject($("div>div>table").parent());

	subject = $("span.head_tit").html();
	date = $("span.sm_num").html();
	content = $("div#artText").html();

	show();
}

// view_heraldm_com
function view_heraldm_com()
{
	date = $("p.dt").html();
	content = $("div#NewsAdContent").html();

	show();
}

// www_hankyung_com
function www_hankyung_com()
{
	date = $("div.modify_date").html();
	content = $("div#newsView.articleTxt").html();

	show();
}

// review_chosun_com
function review_chosun_com()
{
	subject = ">>>" + $("dd#title_text.title_txt").html();
	date = $("div#date_text.art_date").html();
	content = $("div#ArticlePar01").html();

	show();
}

// imnews_imbc_com
function imnews_imbc_com()
{
	subject = $("h3.newsViewTit").html();
	date = $("span.news_data").html();
	content = $("div.txt_frame").html();

	show();
}

// www_zdnet_co_kr
function www_zdnet_co_kr()
{
	date = $("span.data").html();
	content = $("div#content").html();

	show();

	removeRemaining($("div#soeaLayerLoc_fi"), 1000);
}

// www_etnews_com
function www_etnews_com()
{
	removeObject($("div#articleBody>div").eq(0));

	subject = ">>>" + $("div#articleTiile>h1").html();
	date = $("div.text_box>p").html();
	content = $("div#articleBody").html();

	show();

	removeRemaining($("div#soeaLayerLoc_fi"), 1000);
}

// www_ytn_co_kr
function www_ytn_co_kr()
{
	removeObject($("div#relation_news3,div#relation_theme"));

	date = $("li#d_date").html();
	content = $("div#newsContent").html();

	show();
}

// www_ytn_co_kr_photo
function www_ytn_co_kr_photo()
{
	removeObject($("div#relation_news4"));

	subject = ">>>" + $("h2#title_text").html();
	date = $("li#d_date").html();
	content = $("div#newsContent2").html();

	show();
}

// dkbnews_donga_com
function dkbnews_donga_com()
{
	removeObject($("div#divBox,div#view_relate"));

	subject = ">>>" + $("p.dkb_newsTitle").html();
	date = $("span.text11").html();
	content = $("span#read_body").html();

	show();

	removeDelayed("div#scrollDiv");
}

// www_fnnews_com
function www_fnnews_com()
{
	date = $("p.update").html();
	content = $("div#contTxt").html();

	show();

	removeDelayed("div#scrollDiv");
	removeRemaining($("div#cirteo_200200"), 1000);
}

// www_asiae_co_kr
function www_asiae_co_kr()
{
	removeObject($("div.txt>div"));

	date = $("div.area_title>p").html();
	content = $("div.txt").html();

	show();
}

// www_sisapress_com
function www_sisapress_com()
{
	subject = ">>>" + $("td#font_title").html();
	date = $("span.SmN").html();
	content = $("div#articleBody").html();

	show();
}

// news_mk_co_kr
function news_mk_co_kr()
{
	removeObject($("div.read_txt>div,div.read_txt>strong,div.read_txt>img"));

	date = $("span.sm_num").parent().html();
	content = $("div#artText").html();

	show();
}

// photo_donga_com
function photo_donga_com()
{
	date = $("p.title_foot>em").html();
	content = $("div.article_txt").parent().html();

	show();

	removeRemaining($("div#divBox"), 100);
}

// artsnews_mk_co_kr
function artsnews_mk_co_kr()
{
	removeObject($("div[align='center']>div>div>table").parent());

	date = $("div#IDBlock_MAIN>div>div>span>span").html();
	content = $("div#IDContents").html();

	show();
}

// sports_donga_com
function sports_donga_com()
{
	removeObject($("div#divBox"));

	date = $("div.article_tit>p").html();
	content = $("div#ct.article_txt").html();

	show();
}

// news_sbs_co_kr
function news_sbs_co_kr()
{
	date = $("p.lastDate").html();
	content = $("div#content").html();

	show();

	removeRemaining($("div#wrap_head,div#footer01_wrap"), 1000);
}

// www_mydaily_co_kr
function www_mydaily_co_kr()
{
	subject = $("span.news_head").html();
	date = $("span.news_date").html();
	content = $("table[width=\"545\"]").eq(3).html();
	content = "<table>" + content + "</table>";

	show();
}

// www_hani_co_kr
function www_hani_co_kr()
{
	removeObject($("b"));

	date = $("p.date").html();
	content = $("div.article-contents").html();

	show();
}

// www_yonhapnews_co_kr
function www_yonhapnews_co_kr()
{
	date = $("span.pblsh").html();
	content = $("div.article_contents").html();

	show();

	removeRemaining($("div#cleannews_content>h2"), 100);
}

// news_donga_com
function news_donga_com()
{
	removeObject($("div#divBox,div#view_seriallink,div>span"));
	removeObject($("div#view_relate_box_board").parent().parent());

	date = $("p.title_foot").html();
	content = $("div#ct.artcle_txt").html();

	show();
}

// news.inews24.com
function news_inews24_com()
{
	date = $("td.location_txt").eq(1).html();
	content = $("div#newContent4Img").html();

	show();
}

function hideAllObjects()
{
	removeObject($("script,embed,link,meta,style,map"));
	$("a,font").contents().unwrap();
}

function removeObject(obj)
{
	if (obj.length > 0) {
		obj.remove();
	}
}

function removeRemaining(obj, timeout)
{
	setTimeout(function(){
		removeObject(obj);
	}, timeout);
}

function removeDelayed(txt, count)
{
	if (count == null) {
		count = 60; // 500ms * 50 = 25 seconds.
	}

	if (count <= 0) {
		return;
	}

	if ($(txt).length > 0) {
		console.log("Remove: " + txt);
		removeRemaining($(txt), 100);
		return;
	}

	setTimeout(function(){
		console.log("Waiting(" + count + "): " + txt);
		removeDelayed(txt, count - 1);
	}, 500);
}

function show()
{
	if (subject)
	{
		$("head").text("").append("<title>" + subject + "</title>");
		$("body").text("").append("<h2 id=\"cleannews_subject\">" + subject + "</h2><h4 id=\"cleannews_date\">" + date + "</h4><div id=\"cleannews_content\">" + content + "</div>");

		$("*").removeAttr("class");
		$("*").removeAttr("style");
		$("*").removeAttr("width");
		$("*").removeAttr("height");
		$("*").removeAttr("marginwidth");
		$("*").removeAttr("bgcolor");

		$("#cleannews_subject").attr("style", "text-align:center;");
		$("#cleannews_date").attr("style", "margin:10px;text-align:right");
		$("#cleannews_content").attr("style", "text-align:left;font-size:14px;line-height:26px");
	}
}
