var yxVM={data(){return{Part:YxDefine.Part,Colors:YxDefine.ColorPalette,PartDisplay:"none",RightItemDisplay:"none",ColorPaletteDisplay:"none",RightBtnFocus:-1,ColorsDisplay:"none",CurrentRightData:[],CurrentPart:{index:1,value:null,lable:null},CurrentColor:""}},methods:{click_part(){if(this.PartDisplay=="block")this.PartDisplay="none";else this.PartDisplay="block"},select_part(e){this.PartDisplay="none";var t=vm.Part.findIndex(function(t){return t.value==e});vm.CurrentPart.index=t+1;vm.CurrentPart.value=vm.Part[t].value;vm.CurrentPart.label=vm.Part[t].label;var r=Yx3D.GetPart(vm.CurrentPart.value);if(r==null)alert("找不到"+e);else Yx3D.SelectFx(r)},click_rightbtn(t){if(t==5){if(this.ColorsDisplay=="block")this.ColorsDisplay="none";else this.ColorsDisplay="block";return}if(this.RightBtnFocus!=t){this.RightItemDisplay="block";this.RightBtnFocus=t;var e=document.getElementById("right-items");var r=this._rightItemAnchor[t];e.style.right=r.right;e.style.transform="translate("+r.offset+",0)";this.CurrentRightData=this.RightDataList[t]}else{if(this.RightItemDisplay=="block")this.RightItemDisplay="none";else this.RightItemDisplay="block"}},OnSelectRightItem(e){switch(this.RightBtnFocus){case 0:Yx3D.ResetCamera();var t=vm.RightDataList[0].find(function(t){return t.value==e}).path;Yx3D.LoadModel("./yx/res/"+t,function(t){vm.gltf=t;vm.Part=YxDefine.GetModelParts(t);vm.select_part(vm.Part[0].value)});break;case 2:var r=e[0];var i=e[1];var a=vm.RightDataList[2].find(function(t){return t.value==r}).children;alert("选择皮革:"+a.find(function(t){return t.value==i}).label);break;break}this.click_rightbtn(this.RightBtnFocus)},OnSelectColor(t){if(vm.CurrentColor)document.getElementById("col_"+vm.CurrentColor).className="yx-color-cell";console.log("选择颜色:"+t);Yx3D.SetPartColor(vm.CurrentPart.value,YxDefine.GetTHREEColor(t));document.getElementById("col_"+t).className="yx-color-cell-select";vm.CurrentColor=t}},computed:{StyleCurrWrap(){return{}}}};var App=Vue.createApp(yxVM);App.use(ElementPlus);var vm;function YxMain(){document.getElementById("YxView").style.visibility="visible";vm=App.mount("#YxView");vm._rightItemAnchor=[{offset:"0",right:"auto"},{offset:"68px",right:"auto"},{offset:"136px",right:"auto"},{offset:"204px",right:"auto"},{offset:"258px",right:"auto"},{offset:"0",right:"136px"},{offset:"0",right:"68px"},{offset:"0",right:"0"}];vm.RightDataList=[YxDefine.ModelType,[],YxDefine.Material,[],[],[],[],[]];vm.$watch("StyleCurrWrap",function(e,t){var r=vm.LeftProps[0].option.find(function(t){return t.name==e}).key;Yx3D.LoadModel(r)});Yx3D.Init();Yx3D.onPick=function(t){vm.select_part(t.uuid)};vm.click_rightbtn(0);vm.OnSelectRightItem(0)}