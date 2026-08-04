#!/bin/bash
# Usage: ./scripts/new-problem.sh <phase-folder> <problem-name-kebab-case>
# Example: ./scripts/new-problem.sh phase0-data-structures two-sum

PHASE=$1
PROBLEM=$2

if [ -z "$PHASE" ] || [ -z "$PROBLEM" ]; then
  echo "Usage: ./scripts/new-problem.sh <phase-folder> <problem-name-kebab-case>"
  exit 1
fi

DIR="$PHASE/$PROBLEM"
mkdir -p "$DIR"

cat > "$DIR/solution.ts" << 'TS_EOF'
function solve(): void {
  // TODO: implement
}

solve();
TS_EOF

cat > "$DIR/Solution.cs" << 'CS_EOF'
// TODO: implement
Console.WriteLine("Solution.cs");
CS_EOF

echo "Created: $DIR/solution.ts, $DIR/Solution.java, $DIR/Solution.cs"
