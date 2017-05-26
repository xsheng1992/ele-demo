export function creatScroller(elem, options) {
	return new Promise((resolve, reject)=>{
		setTimeout(function(){
			resolve(new IScroll(elem, options));
		}, 100);
	});
}

export function scrollerRefesh(scroller) {
	setTimeout(function(){
		scroller.refresh();
	}, 100);
}
