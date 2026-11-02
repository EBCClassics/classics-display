// Called by the publishing workflow only after both test suites have passed.
const fs=require('node:fs'), cp=require('node:child_process');
const data=JSON.parse(fs.readFileSync('dist/content.json','utf8'));
const before=JSON.parse(cp.execFileSync('git',['show','HEAD:dist/content.json'],{encoding:'utf8'}));
if(JSON.stringify(data.news)===JSON.stringify(before.news)){
 console.log('No changed discovery notices; deploying the fresh check date without a repository commit.');
 process.exit(0);
}
const now=data.newsStatus.lastSuccess, date=new Date(now).toLocaleDateString('en-GB',{timeZone:'Europe/London',day:'numeric',month:'long',year:'numeric'});
const count=data.news.filter(e=>e.feedExtract).length, run=process.env.WORKFLOW_RUN_URL;
if(!/^https:\/\/github\.com\/EBCClassics\/classics-display\/actions\/runs\/\d+$/.test(run||''))throw Error('Expected the repository workflow run URL');
const heading=`## ${date}: daily discovery source check`;
const entry=`${heading}\n\n- Refreshed the source-attributed discovery bank (${count} retained feed notices; latest report ${data.newsStatus.latestPublication}). No generated reporting or remote photographs.\n- Content/scheduling checks and feed-safety checks passed before this save. Deployment outcome: [publishing workflow](${run}); a saved commit alone does not establish successful deployment.\n\n`;
const changelog=fs.readFileSync('CHANGELOG.md','utf8');
fs.writeFileSync('CHANGELOG.md',changelog.replace('# Changelog\n\n','# Changelog\n\n'+entry));
const status=`<!-- NEWS_STATUS_START -->\nDaily source check: ${now}. ${count} feed notices retained; latest report ${data.newsStatus.latestPublication}. Both test suites passed before this save. Deployment is recorded in ${run}.\n<!-- NEWS_STATUS_END -->`;
let handover=fs.readFileSync('CODEX_HANDOVER.md','utf8');
if(handover.includes('<!-- NEWS_STATUS_START -->'))handover=handover.replace(/<!-- NEWS_STATUS_START -->[\s\S]*?<!-- NEWS_STATUS_END -->/,status);
else handover+='\n'+status+'\n';
fs.writeFileSync('CODEX_HANDOVER.md',handover);
fs.writeFileSync('/tmp/classics-news-changed','1');
console.log('Recorded changed discovery notices and successful checks.');
