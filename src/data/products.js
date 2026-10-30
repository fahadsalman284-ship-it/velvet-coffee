const rawProducts = [
 ["midnight-roast","Midnight Roast",24,"Huila, Colombia","Dark","Dark chocolate · Black cherry · Molasses","A slow, deep roast with a lingering finish for quiet mornings and long evenings.","Espresso · French press","#392019","Whole bean",97,true],
 ["golden-crema","Golden Crema",26,"Minas Gerais, Brazil","Medium","Toffee · Apricot · Almond","Soft sweetness and a silky body, lifted by a bright note of stone fruit.","Pour over · AeroPress","#a87442","Whole bean",92,true],
 ["velvet-mocha","Velvet Mocha",25,"Antioquia, Colombia","Medium-dark","Cacao · Sweet spice · Praline","Rounded cacao and warm spice in a balanced, comforting everyday cup.","Espresso · Moka pot","#694532","Whole bean",89,true],
 ["origin-reserve","Origin Reserve",31,"Yirgacheffe, Ethiopia","Light","Jasmine · Citrus · Honey","A delicate floral aroma and a clear, honeyed finish. Let it cool to find its layers.","Pour over · Chemex","#bd9b72","Whole bean",78,true],
 ["dark-velvet-espresso","Dark Velvet Espresso",27,"Minas Gerais, Brazil","Dark","Brown sugar · Walnut · Cocoa","A full-bodied espresso with a rounded crema and an easy, chocolatey finish.","Espresso machine · Moka pot","#41271d","Espresso",85,false],
 ["morning-bloom","Morning Bloom",28,"Antioquia, Colombia","Light","Orange · Red apple · Caramel","A bright, gentle cup with a sweet citrus opening and a soft caramel close.","Pour over · Drip","#bd8152","Whole bean",74,false],
 ["hazelnut-harmony","Hazelnut Harmony",23,"Brazilian blend","Medium","Toasted hazelnut · Milk chocolate","A mellow, nutty profile made for an unhurried first cup.","French press · Drip","#76523a","Flavored",67,false],
 ["caramel-silk","Caramel Silk",23,"Brazilian blend","Medium","Caramel · Biscuit · Cream","A smooth, sweet cup with familiar caramel notes and a gentle body.","Drip · French press","#bb8757","Flavored",70,false],
 ["vanilla-cloud","Vanilla Cloud",24,"Central American blend","Medium","Vanilla · Toffee · Soft cocoa","A fragrant, softly sweet coffee that makes a lovely afternoon pause.","Drip · Pour over","#cfaa7b","Flavored",61,false],
 ["ethiopian-sunrise","Ethiopian Sunrise",30,"Sidama, Ethiopia","Light","Peach · Bergamot · White tea","A fragrant single origin with juicy stone fruit and a clean tea-like finish.","Pour over · Chemex","#c39462","Whole bean",81,false],
 ["colombian-gold","Colombian Gold",27,"Tolima, Colombia","Medium","Red plum · Cocoa · Honey","A balanced single origin with ripe fruit character and a warm cocoa base.","Pour over · Espresso","#a87442","Whole bean",76,false],
 ["signature-house-blend","Signature House Blend",25,"Brazil · Colombia","Medium","Milk chocolate · Pear · Almond","Our everyday blend brings gentle sweetness and a steady, satisfying body.","Drip · Espresso","#593722","Whole bean",99,true],
 ["french-roast","French Roast",24,"South American blend","Dark","Smoked cacao · Clove · Toast","A bold, dark cup with a generous body and a pleasantly smoky edge.","French press · Espresso","#30201a","Ground",64,false],
 ["cinnamon-velvet","Cinnamon Velvet",24,"Central American blend","Medium","Cinnamon · Maple · Cocoa","A warming, aromatic cup with measured spice and a soft maple sweetness.","Drip · Pour over","#9b6543","Flavored",58,false],
 ["decaf-nightfall","Decaf Nightfall",26,"Huila, Colombia","Medium","Cocoa · Date · Toasted almond","A gentle decaf with a rounded body and the familiar comfort of a proper cup.","French press · Drip","#6b4934","Decaf",65,false],
 ["seasonal-special-blend","Seasonal Special Blend",29,"Rotating origin","Medium","Stone fruit · Honey · Spice","A limited seasonal pairing chosen for its warmth and expressive sweetness.","Pour over · Drip","#a97854","Whole bean",72,true],
];

export const products = rawProducts.map(([slug,name,price,origin,roast,note,description,brew,color,type,popularity,featured], index) => ({
  id: `vc-${String(index + 1).padStart(3, "0")}`, slug,name,price,origin,roast,note,description,brew,color,type,popularity,featured,available: true,
  photo: ["https://images.pexels.com/photos/15684222/pexels-photo-15684222.jpeg?auto=compress&cs=tinysrgb&w=1000", "https://images.pexels.com/photos/5171569/pexels-photo-5171569.jpeg?auto=compress&cs=tinysrgb&w=1000", "https://images.pexels.com/photos/28645361/pexels-photo-28645361.jpeg?auto=compress&cs=tinysrgb&w=1000", "https://images.pexels.com/photos/35994486/pexels-photo-35994486.jpeg?auto=compress&cs=tinysrgb&w=1000"][index % 4],
  intensity: { Light: 2, Medium: 3, "Medium-dark": 4, Dark: 5 }[roast] ?? 3,
  size: slug === "origin-reserve" || slug === "ethiopian-sunrise" ? "200 g" : "250 g",
}));
