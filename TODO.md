# GitHub Cleanup TODO

## Completed Steps from Plan
- [x] Rename branch to main
- [x] Push main to GitHub  
- [x] Delete blackboxai/fix-api-port-cors branch

## Next Steps
- Set 'main' as default branch on GitHub (visit repo Settings > Branches > Set default)

## Remaining Steps
- [ ] Set 'main' as default branch on GitHub (Settings > Branches)
- [ ] Clean root node_modules, package.json, query, run-auth-fix.bat, DB files
  - git rm -r --cached node_modules package-lock.json package.json query run-auth-fix.bat student-tracker/data/
  - git commit -m \"Remove unnecessary root files/DB\"
  - git push

