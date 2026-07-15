const fs = require('fs');
const content = fs.readFileSync('d:/project/Online Invitation Website/frontend/src/widgets/invitation-editor/ui/InvitationEditorForm.tsx', 'utf8');

let inString = false;
let stringChar = '';
let openBraces = 0;
let inComment = false;
let inLineComment = false;
let lines = content.split('\n');

for (let lineNum = 0; lineNum < lines.length; lineNum++) {
  let line = lines[lineNum] + '\n';
  let prevBraces = openBraces;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    const nextC = line[i+1];
    
    if (inLineComment) {
      if (c === '\n') inLineComment = false;
      continue;
    }
    if (inComment) {
      if (c === '*' && nextC === '/') {
        inComment = false;
        i++;
      }
      continue;
    }

    if (inString) {
      if (c === '\\') i++; // skip escaped
      else if (c === stringChar) inString = false;
    } else {
      if (c === '/' && nextC === '/') {
        inLineComment = true;
        i++;
      } else if (c === '/' && nextC === '*') {
        inComment = true;
        i++;
      } else if (c === '\'' || c === '"' || c === '`') {
        inString = true;
        stringChar = c;
      } else if (c === '{') {
        openBraces++;
      } else if (c === '}') {
        openBraces--;
      }
    }
  }
  if (prevBraces !== openBraces) {
    console.log((lineNum+1) + ': ' + prevBraces + ' -> ' + openBraces, line.trim());
  }
}
