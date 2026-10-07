const {chromium}=require(require("child_process").execSync("npm root -g").toString().trim()+"/playwright");
(async()=>{
  const b=await chromium.launch({executablePath:process.env.CHROMIUM||"/opt/pw-browsers/chromium"});
  const p=await b.newPage(); const errs=[]; p.on("pageerror",e=>errs.push(e.message));
  await p.goto(process.env.URL);
  const count=()=>p.locator(".lvl").count();
  const chip=n=>p.click(`button.chipbtn:text-is("${n}")`);
  const out={todas:await count()};
  const names=["Mediados s. XX","Finales s. XX","Primera década s. XXI","Segunda década s. XXI","Actualidad (2020 en adelante)"];
  for(const n of names){ await chip(n); out[n]=await count(); await chip(n); }
  await chip(names[3]); await chip(names[4]); out["2010s+actualidad"]=await count();
  await chip(names[0]); await chip(names[1]); await chip(names[2]); out["cinco marcadas"]=await count();
  await chip("Todas"); // ojo: hay varias "Todas"; se usa la de Época
  out.errs=errs; console.log(JSON.stringify(out)); await b.close();
})();
