export function page(res, page, title, tab, status=200, css="", script="", search_data=[], search_placeholder="", input_text="", loading_text="") {
	res.render(page, {
		page_title: title,
		page_tab: tab,
		page_status: status,
		page_css: css,
		page_script: script,
		search_data: search_data,
		search_placeholder: search_placeholder,
		search_term: input_text,
		load_text: loading_text
	});
}

export function home(res, status=200) {
	page(res,
		"pages/home",			// Page Location
		"T9Hacks",				// Page Title
		"Home",					// Page Tab
		status, 				// Page Status
		"home",					// Page CSS
		"carbon",				// Page Script
		[],	"Enter a URL to analyze a site's carbon footprint...",
		"",	"Analyzing carbon footprint..."
	);
}

export function footprint(res, status=200, search_results) {
	page(res,
		"pages/footprint.ejs", 		 // Page Location
		"Carbon Footprint Analyzer", // Page Title
		"Home",						 // Page Tab
		status,						 // Page Status
		"carbon",					 // Page CSS
		"carbon",					 // Page Script
		search_results,		 // API Return Data
		"Filter results"		 // Searchbox Filler Text
	);
}