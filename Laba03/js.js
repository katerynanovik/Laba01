var shopList={};

shopList.list=[
   { name: "Помідори", amount: 1 },
   { name: "Печиво", amount: 1 },
   { name: "Сир", amount: 1 }
];

var item_html =
   '<div class="productRow"><div class="section1"><span class="product1" spellcheck="false" contenteditable="true" >{{item}}</span></div><div class="section2"><button class="minus" id={{minus_id}} data-tooltip="Зменшити"><i class="iconMinus">-</i>  </button> <span class="counterBetweenIcons" id={{idAmount}}>{{amount}}</span><button class="plus" id={{plus_id}}  data-tooltip="Збільшити">+</button> </div><div class="section3"><button class="kuplenoButton" data-tooltip="Куплено">Куплено</button><button class="cross"  data-tooltip="Скасувати" id={{del_id}} data-del-id="{{delid}}" >x</button></div></div>'

var remain_html='<span class="boughtAndCounter"><span class="bought">{{Product}}</span><span class="counter">{{amount}}</span></span>'

function showlist() {
	$("#productsList").html("");
	$(".ProductsAmount").html("");
	for (var i = 0; i < shopList.list.length; i++) {
    	var item = shopList.list[i];
    	var del_item_id = "delBuyItem" + i;
    	var current_item_html = item_html
    	 	.replace("{{item}}", item.name)
  			.replace("{{amount}}", item.amount)
  			.replace("{{del_id}}", del_item_id)
  			.replace("{{delid}}", i)
  			.replace("{{plus_id}}", i)
  			.replace("{{minus_id}}", i);


  		var current_remain_html = remain_html
  			.replace("{{Product}}", item.name)
  			.replace("{{amount}}", item.amount);
			
  		$(".ProductsAmount").append(current_remain_html);

  		$("#productsList").append(current_item_html);


  		$('#'+i+'.plus').click(function(){
  			shopList.list[this.id].amount+=1;
  			showlist();
  		});
  		$('#'+i+'.minus').click(function(){
  			if(shopList.list[this.id].amount >1){
  			shopList.list[this.id].amount-=1;

  		}
  			showlist();
  		});
  		if(shopList.list[i].amount>1)
  		$('#'+i+'.minus').css({'background-color':'red'});

  		$("#" + del_item_id).click(function () {
         removeProduct($(this).attr("data-del-id"));
      });
	}
}
showlist();

	$(".Add").click(function () {
		if ($("#name").val()!=""){
   shopList.list.push({
      name: $("#name").val(),amount: 1,
   });
   $("#name").val("");
   showlist();
}	
});

	$(document).keypress(function (e) {
		 if (e.which == 13) {
		 	if ($("#name").val()!="")
		 	shopList.list.push({
      name: $("#name").val(),amount: 1,
   });
   $("#name").val("");
   showlist();
		 }
		});

   function removeProduct(id) {
   shopList.list.splice(id, 1);
   showlist();
}
