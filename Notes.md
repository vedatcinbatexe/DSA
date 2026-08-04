# DSA Curriculum — Full Detailed Path with Checkpoints (~510-530h)

Daily 1h (weekday) / included in weekend deep-work blocks, spanning the full 15 months. Work top to bottom. For every topic: work through every checkpoint bullet below (don't skip — each is a specific, checkable skill, not a restatement of the last one), then solve the practice problems, then redo any failed problem after 7 days.

---

## Phase 0 — Data Structures Refresher (Weeks 1-2, ~14h)

### Arrays
- [ ] Explain why index access is O(1): contiguous memory means the address of element `i` is computed directly (`base + i × size`), no traversal needed
- [ ] Explain why dynamic arrays (Python lists, `List<T>`, `ArrayList`) give O(1) *amortized* append: when capacity is exceeded, the array doubles in size and copies everything — expensive once, but rare, so it averages out over many appends
- [ ] Explain why insertion/deletion at an arbitrary index is O(n): every element after the insertion point must physically shift
- [ ] Self-check: what's the complexity of inserting at the *front* of an array vs. the *back*? (Front = O(n) shift, back = O(1) amortized)
- [ ] Self-check: if you know you'll delete an element but don't care about order, what O(1) trick avoids the shift? (Swap with the last element, then pop)

### Strings
- [ ] Explain why string concatenation in a loop is a hidden performance trap in immutable-string languages (Python, Java, C#): each `+=` creates a brand-new string, copying everything so far — an O(n) loop of concatenations becomes O(n²) total
- [ ] Know the fix: build a list/array of pieces and join once at the end (O(n) total), or use a mutable builder (`StringBuilder` in Java/C#)
- [ ] Practice recognizing when a fixed-size array (26 slots for lowercase letters) is a faster substitute for a hash map in frequency-counting problems
- [ ] Self-check: why is a 26-slot array both faster *and* more memory-predictable than a hash map when you know the alphabet is small and fixed?

### Linked Lists
- [ ] Explain the trade-off: O(1) insert/delete at a *known* position, but O(n) to *find* that position (no random access, unlike arrays)
- [ ] Practice the three-pointer bookkeeping pattern (`prev`, `curr`, `next`) needed for safe reversal without losing a reference
- [ ] Understand singly (forward-only traversal) vs. doubly linked (backward traversal possible, but extra memory per node for the back-pointer)
- [ ] Checkpoint: implement singly-linked-list reversal from scratch, with zero reference material, twice on two different days (repetition matters more than getting it right once)
- [ ] Self-check: why can't you binary-search a linked list even if it's sorted? (No O(1) random access to the midpoint)

### Stacks & Queues
- [ ] Explain why a stack (LIFO) naturally models nested structure: the most recently opened thing must be the first thing closed (parentheses, function call stacks, undo history)
- [ ] Explain why a plain array's `pop(0)`-style "remove from front" is O(n): every remaining element must shift left by one
- [ ] Know the fix for O(1) queue operations: a circular buffer (fixed array with wraparound indices) or a doubly linked list
- [ ] Understand deques (double-ended queues): O(1) push/pop from *both* ends — this is the structure behind the monotonic deque pattern later in the curriculum
- [ ] Self-check: if you only had a stack (no queue), how would you simulate queue behavior? (Two-stack trick: push onto stack A, transfer to stack B — reversing order — only when B is empty and you need to pop)

### Hash Tables / Hash Sets
- [ ] Explain the core mechanism: a hash function converts a key into an array index; collisions (two keys hashing to the same index) are handled via chaining (a list per bucket) or open addressing (probe for the next free slot)
- [ ] Explain why average-case lookup is O(1) but worst-case can be O(n): if the hash function distributes keys poorly (or an adversary crafts colliding keys), everything piles into one bucket
- [ ] Explain load factor: as the table fills up, collision rate rises, so most implementations automatically resize (and rehash everything) once a threshold is crossed — this resize is O(n) but happens rarely enough to keep amortized cost O(1)
- [ ] Self-check: why does resizing require *rehashing* every existing key, not just copying them to a bigger array? (The hash-to-index mapping depends on table size, so old indices are invalid in the new table)

### Trees (Binary Tree, BST)
- [ ] Understand node structure: value + left child pointer + right child pointer (+ optionally a parent pointer)
- [ ] Explain height vs. depth: depth is distance from root to a specific node; height is the longest root-to-leaf path in the whole tree (or subtree)
- [ ] Explain the BST invariant precisely: for *every* node, not just its immediate children, everything in the left subtree is smaller and everything in the right subtree is larger
- [ ] Explain why an unbalanced BST (e.g., built by inserting already-sorted data) degrades to a linked list — O(n) operations instead of O(log n)
- [ ] Checkpoint: implement BST insert and search from scratch without reference material
- [ ] Self-check: given a BST search that just failed to find a value, what does the last node you visited tell you about where that value *would* go if inserted?

### Heaps
- [ ] Understand the array-based representation: for a node at index `i`, children live at `2i+1` and `2i+2`, parent lives at `(i-1)/2` — no explicit pointers needed
- [ ] Explain sift-up (bubble a newly-inserted element toward the root while it violates heap order) and sift-down (push the root downward after removing the top, to restore heap order)
- [ ] Explain why peek (look at the min/max) is O(1) but insert/extract are O(log n): peek just reads index 0; insert/extract require re-establishing heap order along a path of height log n
- [ ] Self-check: why is a heap *not* fully sorted internally, even though the top is always the min (or max)? (Only the parent-child ordering is guaranteed, not sibling-to-sibling)

### Graphs
- [ ] Understand adjacency list (each node stores a list of its neighbors) vs. adjacency matrix (an N×N grid where `matrix[i][j]` indicates an edge)
- [ ] Explain the trade-off: adjacency list is memory-efficient for sparse graphs and fast to iterate over a node's neighbors; adjacency matrix gives O(1) "is there an edge between i and j" but wastes memory on sparse graphs and costs O(V²) space regardless of edge count
- [ ] Know directed vs. undirected (does an edge imply the reverse edge exists) and weighted vs. unweighted (does each edge carry a cost)
- [ ] Self-check: for a social network with millions of users but each user only having ~200 friends, which representation would you choose and why? (Adjacency list — the graph is extremely sparse relative to V²)

### Tries, Union-Find, Segment Trees — orientation only
- [ ] Know a trie exists to answer "does any stored string start with this prefix" efficiently — full mechanics in Phase 10
- [ ] Know Union-Find exists to answer "are these two elements in the same group" and "merge these two groups" efficiently — full mechanics in Phase 9
- [ ] Know segment trees/BIT exist to answer range queries (sum/min/max over a range) with fast updates — full mechanics in Phase 16

---

## Phase 1 — Algorithmic Foundations (Weeks 3-5, ~21h)

### Big-O / Big-Θ / Big-Ω Analysis
- [ ] Practice identifying O(1), O(log n), O(n), O(n log n), O(n²), O(2ⁿ) directly from code shape (single pass, halving loop, nested loop, divide-and-conquer, recursive branching)
- [ ] Learn to spot hidden complexity inside built-ins: `x in some_list` is O(n) but `x in some_set` is O(1); `.sort()` is O(n log n) every time it's called, even on a small slice
- [ ] Practice stating both time *and* space complexity for every solution you write from this point forward — space is asked about roughly as often as time and is easy to forget
- [ ] Self-check: what's the complexity of building a frequency map with a single pass, then finding the max in that map? (O(n) + O(k) where k is the number of distinct keys — usually simplifies to O(n))

### Prefix Sums
- [ ] Understand the construction: `prefix[i] = prefix[i-1] + arr[i]`, so `prefix[i]` holds the sum of everything up to and including index i
- [ ] Understand the query: sum of range [i, j] = `prefix[j] - prefix[i-1]` — O(1) per query after O(n) preprocessing
- [ ] Self-check: why does this technique break down if the array is frequently *updated* between queries? (Every update would require re-computing the prefix array — this is exactly the gap segment trees/BIT solve later)

### Two Pointers
- [ ] Recognize the trigger conditions: sorted array, or searching for a pair/triplet meeting a sum/difference condition
- [ ] Practice the "opposite ends, move inward" variant: start at both ends, move whichever pointer helps you approach the target
- [ ] Practice the "same direction, different speeds" variant (used again later for fast/slow pointers on linked lists)
- [ ] Self-check: in 3Sum, why do you sort first and then fix one element while two-pointering the rest, instead of trying three nested loops? (Sorting + two pointers brings it from O(n³) to O(n²), and sorting also makes duplicate-skipping straightforward)
- [ ] Practice: Two Sum II, Valid Palindrome, 3Sum, Container With Most Water

---

## Phase 2 — Sliding Window, Hashing, Sorting (Weeks 6-8, ~21h)

### Sliding Window — Fixed Size
- [ ] Recognize the trigger: "subarray of exactly size k"
- [ ] Practice the incremental-update trick: instead of recomputing the window's sum/property from scratch each shift, subtract the outgoing element and add the incoming one

### Sliding Window — Variable Size
- [ ] Recognize the trigger: "longest/shortest subarray/substring satisfying a condition"
- [ ] Practice the expand-then-shrink loop: grow the right edge until the condition breaks, then shrink the left edge until it's valid again, tracking the best window seen
- [ ] Self-check: in Minimum Window Substring, what data structure tracks "have I covered all required characters yet" efficiently, and why? (A count map of required characters plus a running "how many are satisfied" counter, so you don't re-scan the whole window every time)

### Hashing for Lookups
- [ ] Recognize three trigger phrases: "have I seen this before," "what's the complement/pair," "group by shared property"
- [ ] Practice building the map in one pass and querying it in the same or a second pass
- [ ] Self-check: in Group Anagrams, what value works as a map key to identify "these strings are anagrams of each other"? (Either the sorted string, or a tuple/string of character counts — the second is faster since it avoids sorting)

### Sorting as Setup
- [ ] Recognize when a problem becomes a simple linear scan *after* sorting, even though sorting itself costs O(n log n)
- [ ] Self-check: why does sorting intervals by start time make the "merge overlapping intervals" problem solvable in one pass? (Once sorted, you only ever need to compare each interval to the *most recently merged* one, not all previous ones)
- [ ] Practice: Best Time to Buy/Sell Stock, Longest Substring Without Repeating Characters, Minimum Window Substring, Two Sum, Group Anagrams, Longest Consecutive Sequence, Merge Intervals, Meeting Rooms

---

## Phase 3 — Binary Search (Weeks 9-11, ~21h)

### Classic Binary Search
- [ ] Practice writing the loop with exact boundary discipline: decide up front whether you're using `left <= right` (searching for an exact value) or `left < right` (searching for a boundary/insertion point), and stay consistent
- [ ] Practice the `mid` calculation that avoids integer overflow in languages where it matters: `left + (right - left) // 2` instead of `(left + right) // 2`
- [ ] Self-check: what's the most common off-by-one bug in binary search, and why does it happen? (Forgetting to update `left = mid + 1` or `right = mid - 1` — using `mid` itself in the update causes infinite loops)

### Binary Search on Rotated Arrays
- [ ] Practice the two-step decision at each midpoint: first determine which half (left of mid, or right of mid) is properly sorted, then check whether the target falls within that sorted half's range
- [ ] Self-check: why can't you just binary search normally on a rotated array? (The "is target bigger or smaller than mid" comparison no longer reliably tells you which direction to go, since the array isn't globally sorted)

### Binary Search on the Answer Space
- [ ] Practice the reframing: define a "can this value work?" feasibility check, then binary search over the range of *possible answers* rather than over an array
- [ ] Self-check: in Koko Eating Bananas, what are you actually binary searching over? (Not the array of banana piles — the range of possible eating speeds, from 1 to the largest pile size)
- [ ] Practice: Search in Rotated Sorted Array, Find Minimum in Rotated Sorted Array, Koko Eating Bananas

---

## Phase 4 — Linked List Patterns (Weeks 12-14, ~21h)

### Reversal and Reordering
- [ ] Practice iterative reversal: maintain `prev = None`, walk forward, at each node save `next`, point `curr.next` back to `prev`, then advance all three pointers
- [ ] Practice recursive reversal as a second method — useful because interviewers sometimes explicitly ask for both approaches

### Fast & Slow Pointers (Floyd's Algorithm)
- [ ] Practice cycle detection: slow moves 1 step, fast moves 2 steps per iteration; if they ever meet, there's a cycle; if fast reaches `None`, there isn't
- [ ] Practice midpoint-finding: when fast reaches the end, slow is exactly at the midpoint — useful as a subroutine (e.g., before reversing the second half of a list)
- [ ] Self-check: why does the fast pointer *always* catch the slow pointer if a cycle exists, rather than looping past it forever? (Each step closes the gap between them by exactly 1, since fast gains 1 extra step of relative distance per iteration)
- [ ] Practice: Reverse Linked List, Linked List Cycle, Reorder List, Copy List with Random Pointer

---

## Phase 5 — Stack/Queue Patterns: Monotonic Stack (Weeks 15-17, ~21h)

### Basic Stack Matching
- [ ] Practice the push-on-open, pop-and-check-on-close pattern for nested/matching structures
- [ ] Self-check: why does a stack (not a queue) correctly validate nested parentheses? (The most recently opened bracket must be the next one closed — LIFO order matches that requirement exactly)

### Monotonic Stack
- [ ] Practice maintaining strictly increasing or strictly decreasing order in the stack: before pushing a new element, pop everything that violates the order
- [ ] Understand what each pop "resolves": the popped element's answer (e.g., "next greater element") is exactly the element that caused it to be popped
- [ ] Self-check: why is this O(n) total across the whole array, even though it looks like a nested loop (a `while` pop loop inside a `for` loop)? (Each element is pushed once and popped at most once — total pushes + pops is bounded by 2n)
- [ ] Practice: Valid Parentheses, Daily Temperatures, Largest Rectangle in Histogram, Trapping Rain Water

---

## Phase 6 — Trees: Traversals & BST Problems (Weeks 18-21, ~28h)

### Traversals
- [ ] Practice preorder (root, left, right) — useful for copying/serializing a tree, since you record the root before its children
- [ ] Practice inorder (left, root, right) — produces sorted order on a BST specifically; this is a fact worth memorizing since it's reused constantly
- [ ] Practice postorder (left, right, root) — useful when children must be fully processed before the parent (e.g., computing subtree sizes, deleting a tree bottom-up)
- [ ] Practice level-order (BFS with a queue) — process one depth level at a time, useful whenever "level" or "depth" appears in the problem statement

### BST Validation
- [ ] Practice the correct approach: pass down a valid (min, max) range to each recursive call, tightening it as you descend, rather than only comparing a node to its immediate children
- [ ] Self-check: why does "check that left child < node < right child" at every node *fail* to validate a BST correctly? (A node deep in the left subtree could still violate the ordering relative to an ancestor several levels up, even if it satisfies its immediate parent)

### Tree Construction from Traversal Pairs
- [ ] Practice reconstructing from preorder + inorder: the first element of preorder is always the root; find that value's position in inorder to know how many nodes belong to the left subtree vs. the right
- [ ] Self-check: why does preorder + inorder uniquely determine a tree, but preorder + postorder generally doesn't (for trees that aren't strictly binary)? (Inorder's left/right split around the root is the missing piece of information postorder alone doesn't give you as directly)

### Lowest Common Ancestor
- [ ] Practice the general binary tree approach: recursively search both subtrees; if one target is found in each, the current node is the LCA; otherwise propagate whichever side found something
- [ ] Practice the BST-specific shortcut: use the ordering property to go left or right without exploring both sides, since you always know which subtree could possibly contain both targets
- [ ] Practice: Binary Tree Level Order Traversal, Validate BST, Construct Binary Tree from Preorder/Inorder, Kth Smallest Element in a BST

---

## Phase 7 — Heaps / Priority Queues (Weeks 22-24, ~21h)

### Top-K Pattern
- [ ] Practice maintaining a heap of size K as you scan: push each new element, and if the heap exceeds size K, pop the worst one — final heap contents are your answer
- [ ] Self-check: why is this O(n log k) instead of O(n log n) from sorting everything? (You're only ever maintaining a heap of size k, not n, so each push/pop is cheaper, and there are only n of them)

### Two-Heap Technique
- [ ] Practice keeping a max-heap for the smaller half of seen numbers and a min-heap for the larger half, rebalancing sizes after each insertion so they differ by at most 1
- [ ] Self-check: why does this give you the median in O(1) *read* time even though insertion is O(log n)? (The median is always at the top of one or both heaps once balanced — no scan needed to find it)
- [ ] Practice: Top K Frequent Elements, K Closest Points to Origin, Find Median from Data Stream

---

## Phase 8 — Backtracking (Weeks 25-28, ~28h)

### Choose–Explore–Unchoose
- [ ] Practice the three-step recursive shape explicitly: make a choice, recurse as if it's permanent, then undo it before trying the next option — the "undo" step is the one people forget under pressure
- [ ] Self-check: what happens to your output if you forget the "unchoose" step? (State leaks between branches — later branches incorrectly include earlier choices that should have been reverted)

### Subsets vs. Permutations vs. Combinations
- [ ] Practice subsets: at each element, branch into "include it" and "exclude it"
- [ ] Practice permutations: at each recursive call, try every *unused* element as the next position
- [ ] Practice combinations: pick elements in order without repeats, advancing a start index to avoid duplicate combinations in different orders

### Pruning
- [ ] Practice cutting a branch the moment it becomes provably invalid (e.g., current sum already exceeds the target), rather than completing the branch and checking validity at the end
- [ ] Self-check: in N-Queens, what's the earliest point you can detect a placement is invalid, and why does checking early matter so much for runtime? (Check column/diagonal conflicts immediately upon placing each queen — without this, the search space explodes combinatorially before any invalid placement is caught)
- [ ] Practice: Subsets, Combination Sum, Permutations, Word Search, N-Queens

---

## Phase 9 — Graphs: Traversal & Structure (Weeks 29-33, ~35h)

### BFS on Graphs
- [ ] Practice the queue-based level-by-level expansion, marking nodes visited *at the time they're added to the queue*, not when they're processed (a common bug source — processing-time marking can enqueue the same node multiple times)
- [ ] Self-check: why does BFS guarantee the shortest path in an *unweighted* graph specifically? (It explores all nodes at distance 1 before any at distance 2, and so on — the first time you reach a node is guaranteed to be via the shortest path)

### DFS on Graphs
- [ ] Practice both recursive and explicit-stack iterative DFS — know both, since recursion depth limits can matter on very deep graphs
- [ ] Self-check: when would you prefer DFS over BFS even though BFS gives shortest paths? (When you need to explore *all* paths, check connectivity, or the graph is too wide for BFS's memory footprint but reasonably deep)

### Topological Sort
- [ ] Practice Kahn's algorithm (BFS-based: repeatedly remove nodes with in-degree 0) and the DFS-based approach (post-order, then reverse) — know both
- [ ] Self-check: how does topological sort double as a cycle detector? (If you can't place all nodes — Kahn's algorithm runs out of in-degree-0 nodes before processing everyone — a cycle must exist)

### Union-Find (Disjoint Set)
- [ ] Practice path compression (when finding a group's root, flatten the path so future lookups are faster) and union by rank/size (always attach the smaller tree under the larger one's root)
- [ ] Self-check: why do these two optimizations together give near-O(1) operations, despite a naive Union-Find being O(n) worst case? (They keep the resulting trees shallow, bounding operation cost by the inverse Ackermann function — effectively constant for any realistic input size)

### Dijkstra's Algorithm
- [ ] Practice the priority-queue-driven expansion: always process the currently cheapest-to-reach unvisited node next, updating neighbors' distances if a shorter path is found
- [ ] Self-check: why does Dijkstra fail on graphs with negative edge weights? (It assumes once a node is finalized with its shortest distance, no future discovery can improve it — negative edges can violate that assumption)
- [ ] Practice: Number of Islands, Clone Graph, Course Schedule, Pacific Atlantic Water Flow, Network Delay Time, Accounts Merge

---

## Phase 10 — Trie (Weeks 34-36, ~21h)

### Prefix Tree Construction
- [ ] Practice building the structure: each node holds a map/array of children (one per possible next character) and a flag marking "a word ends here"
- [ ] Self-check: what's the time complexity of checking whether a prefix exists, in terms of the prefix length (not the number of stored words)? (O(L) where L is the prefix length — independent of how many words are stored)

### Trie + DFS Combination
- [ ] Practice walking the trie and the grid (or search space) simultaneously during DFS, so you can abandon a path the instant it no longer matches any trie prefix
- [ ] Self-check: without the trie, why would Word Search II be much slower? (You'd have to independently search the grid once per dictionary word, instead of sharing the search across all words that share a prefix)
- [ ] Practice: Implement Trie, Word Search II, Design Add and Search Words Data Structure

---

## Phase 11 — Intervals (Weeks 37-38, ~14h)

### Merge/Insert Intervals
- [ ] Practice sorting by start time first, then scanning once, merging whenever the current interval's start is ≤ the previous merged interval's end
- [ ] Self-check: why does sorting by start time (rather than end time) make this a single clean pass? (It guarantees you only ever need to compare against the most recently merged interval, never revisit earlier ones)

### Overlap Counting
- [ ] Practice the separate-sort-and-sweep approach: sort start times and end times independently, then walk through counting how many "starts" have occurred before the next "end"
- [ ] Self-check: why can't you just sort the intervals themselves for this problem the way you did for merging? (You need to know the count of simultaneously active intervals at any point, which requires comparing starts against ends independently, not intervals against each other)
- [ ] Practice: Insert Interval, Non-overlapping Intervals, Meeting Rooms II

---

## Phase 12 — Dynamic Programming Core (Weeks 39-44, ~42h)

### 1D DP
- [ ] Practice identifying overlapping subproblems: notice when a brute-force recursive solution recomputes the same smaller inputs repeatedly
- [ ] Practice both memoization (top-down: recursion + a cache) and tabulation (bottom-up: build an array iteratively) for the same problem, since interviewers sometimes ask for both
- [ ] Self-check: in House Robber, what does `dp[i]` actually represent, in plain English? (The maximum money obtainable considering houses 0 through i, given the "no two adjacent" constraint)

### 2D DP / Grid DP
- [ ] Practice defining the 2D state precisely before writing any code: what do the two indices represent, and what does the value at `dp[i][j]` mean?
- [ ] Self-check: in Longest Common Subsequence, why does `dp[i][j]` need *both* string positions as state, rather than just one? (The answer depends on how far you've progressed through *both* strings simultaneously — collapsing to one dimension would lose information)

### Knapsack Family
- [ ] Practice 0/1 knapsack: each item used at most once, iterate items in the outer loop, capacity in the inner loop (and be able to explain why iteration order matters for correctness)
- [ ] Practice unbounded knapsack: items reusable, which changes the iteration direction/order compared to 0/1
- [ ] Self-check: in Coin Change, why is this an unbounded knapsack, not 0/1? (You can use the same coin denomination multiple times)
- [ ] Practice: Climbing Stairs, House Robber, Decode Ways, Unique Paths, Longest Common Subsequence, Coin Change, Partition Equal Subset Sum

---

## Phase 13 — Dynamic Programming Advanced (Weeks 45-49, ~35h)

### DP on Strings
- [ ] Practice Edit Distance's three-way recurrence: at each character pair, consider match/no-op, insert, delete, and substitute, taking the minimum
- [ ] Self-check: why is expand-around-center usually preferred over full DP for Longest Palindromic Substring? (It achieves the same O(n²) time with O(1) space, versus DP's O(n²) space for the table)

### DP on Trees
- [ ] Practice defining what each recursive call returns for a subtree, and how the parent combines its children's returned values
- [ ] Self-check: in House Robber III, why does each recursive call need to return *two* values (rob this node vs. don't), not just one? (The parent needs both options available to correctly decide its own best choice, since "don't rob parent" allows either choice for the child)

### Interval DP
- [ ] Practice the split-point recurrence: for a range [i, j], try every possible position k as the "last operation" or "dividing point," combining the cost of the two resulting sub-ranges
- [ ] Self-check: in Burst Balloons, why do you think about which balloon is popped *last* in a range, instead of first? (Thinking "last" makes the two resulting sub-ranges independent of each other — thinking "first" leaves them entangled, since popping order affects neighbors)

### Bitmask DP
- [ ] Practice representing "which subset of elements has been used" as an integer, where bit `i` means "element i is included"
- [ ] Self-check: why is this approach only feasible for small n (roughly ≤ 20)? (The number of possible subsets is 2ⁿ, so the state space itself becomes intractable beyond a couple dozen elements)
- [ ] Practice: Edit Distance, Longest Palindromic Substring, Word Break II, House Robber III, Burst Balloons, small Traveling-Salesman-style problems

---

## Phase 14 — Greedy Algorithms (Weeks 50-51, ~14h)

### Recognizing Valid Greedy Structure
- [ ] Practice checking for the greedy-choice property: can you prove (even informally) that the locally best choice never rules out a globally optimal solution?
- [ ] Self-check: what's a scenario where a tempting greedy approach silently gives the wrong answer, and DP is needed instead? (Coin Change with arbitrary denominations — always taking the largest coin first can produce a suboptimal count for certain denomination sets, unlike with standard currency systems)
- [ ] Practice: Jump Game, Gas Station, Task Scheduler

---

## Phase 15 — Bit Manipulation (Weeks 52-53, ~14h)

### XOR Tricks
- [ ] Practice the self-cancellation property: `x XOR x = 0` and `x XOR 0 = x`, which is why XOR-ing a list where every element appears twice except one leaves only the unpaired element
- [ ] Self-check: why does order not matter when XOR-ing a sequence of numbers? (XOR is both commutative and associative, so pairs cancel regardless of the order they appear in)

### Bitmasking
- [ ] Practice representing set membership as bits, and set operations (union = OR, intersection = AND, toggle = XOR) as single bitwise instructions
- [ ] Practice: Single Number, Counting Bits, Sum of Two Integers

---

## Phase 16 — Advanced Structures (Weeks 54-57, ~28h)

### Segment Tree / Binary Indexed Tree (BIT)
- [ ] Practice building a segment tree bottom-up, where each internal node stores an aggregate (sum/min/max) of its children's ranges
- [ ] Self-check: why does a segment tree beat a prefix-sum array when updates happen frequently? (Prefix sums are O(n) to update since everything downstream shifts; a segment tree only touches O(log n) nodes on update)

### String Matching (KMP, Rabin-Karp)
- [ ] Practice understanding KMP's failure function conceptually: it precomputes, for each position in the pattern, how far to "fall back" on a mismatch without re-scanning characters you've already matched
- [ ] Practice understanding Rabin-Karp's rolling hash: compute a hash of each substring in O(1) by incrementally updating the previous window's hash, rather than rehashing from scratch
- [ ] Self-check: why do both algorithms achieve O(n + m) instead of the naive O(n × m)? (Both avoid redundant re-comparison of characters that were already confirmed to match in a previous attempt)

### Monotonic Deque
- [ ] Practice maintaining a deque in decreasing order (for max) or increasing order (for min), popping from the back when a new element invalidates older ones, and popping from the front when the window slides past the oldest element
- [ ] Practice: Range Sum Query — Mutable, Count of Smaller Numbers After Self, Shortest Palindrome, Sliding Window Maximum

---

## Phase 17 — Design Problems (Weeks 58-60, ~21h)

### Composing Structures to Meet an API Contract
- [ ] Practice reading a design problem's requirements as explicit time-complexity constraints per operation, then choosing structures that satisfy each one individually
- [ ] Self-check: in LRU Cache, why do you need *both* a hash map and a doubly linked list, and why won't either alone suffice? (The hash map gives O(1) key lookup but no ordering; the doubly linked list gives O(1) reordering/eviction but no O(1) key lookup — combined, you get both)
- [ ] Self-check: in LFU Cache, why is tracking frequency alone not enough — what's the tie-breaking rule when two items have the same frequency? (Least recently used among items with equal frequency — this is why LFU is usually implemented as frequency buckets, each internally ordered by recency)
- [ ] Practice: LRU Cache, LFU Cache, Design Twitter, Design HashMap, Insert Delete GetRandom O(1)

---

## Phase 18 — Mixed Review & Mock Practice (Weeks 61-72, ~84h)

### Timed Mixed-Pattern Sets
- [ ] Practice solving problems with the pattern *not* labeled — this is the actual interview condition, and it's a distinct skill from solving a problem when you already know which chapter it came from
- [ ] Enforce real time limits (30-45 min) and no hints, even when tempted

### Spaced-Repetition Redo Pass
- [ ] Revisit every problem in your tracking log marked "hinted" or "failed," prioritizing the oldest first
- [ ] Self-check before each redo: can you state the pattern and the core technique from memory before you start coding, not just once you're mid-solution?

### Mock Interviews
- [ ] Practice narrating your thought process out loud continuously — approach, edge cases, complexity — not just while stuck
- [ ] Practice stating complexity *before* you finish coding, then confirming it matches once done

### Weak-Area Drilling
- [ ] Use the tracking log to compute first-attempt success rate per pattern, and spend extra sessions on whichever pattern is lowest, rather than assuming even time across all patterns is optimal
- [ ] Practice: mixed sets drawn from every phase above

---

## Weekly Habit (applies throughout, not just Phase 18)

- [ ] One problem daily in the current phase's pattern
- [ ] One redo weekly of a problem failed exactly 7 days ago
- [ ] Once a month, revisit the Phase 0 self-check questions cold — data structure fundamentals fade faster than people expect once you're deep into pattern practice

## Progress Tracking

Keep a running log: problem name, pattern, date attempted, outcome (solved unaided / solved with hint / failed), redo date (+7 days). This log — not the calendar — tells you whether a phase is actually done. If a pattern's first-attempt success rate is still low, stay an extra week rather than advancing on schedule.

---

## Appendix — Language-Specific Implementation Notes (C#, Java, TypeScript)

Knowing a structure conceptually isn't the same as knowing how your interview language implements it. Review this alongside Phase 0, and again before interviews in each specific language.

### Arrays / Dynamic Arrays
- [ ] **C#**: `List<T>` — dynamic array, doubles capacity on resize; `Array` — fixed-size; `Span<T>` — allocation-free slice over contiguous memory, useful for hot-path algorithm code without heap allocation
- [ ] **Java**: `ArrayList<T>` — dynamic array, grows by 50% on resize (not doubling like most languages); raw arrays are fixed-size
- [ ] **TypeScript**: arrays are dynamic by default (backed by V8 internals); typed arrays (`Int32Array`, `Float64Array`) give C-style fixed-size numeric arrays — meaningfully faster for numeric-heavy problems

### Hash Tables / Maps
- [ ] **C#**: `Dictionary<K,V>` — hash table, O(1) average; `SortedDictionary<K,V>` — red-black tree underneath, O(log n) but keeps keys sorted
- [ ] **Java**: `HashMap<K,V>` — as of Java 8, buckets exceeding a collision threshold (8 entries) convert from a linked list to a red-black tree internally ("treeify"), capping worst-case lookup at O(log n); `TreeMap`/`TreeSet` — explicit red-black tree, O(log n), sorted iteration
- [ ] **TypeScript**: `Map` vs. plain `Object` — `Map` preserves insertion order reliably, allows non-string keys, better performance for frequent add/delete; prefer `Map` over `Object` for algorithm problems
- [ ] Checkpoint: can you explain why Java's `HashMap` has a better worst-case guarantee than a naive hash table with chaining?

### Lists / Linked Lists
- [ ] **C#**: `LinkedList<T>` — genuine doubly linked list, O(1) insert/delete given a node reference
- [ ] **Java**: `LinkedList<T>` implements both `List` and `Deque` — usable as a stack, queue, or deque directly
- [ ] **TypeScript**: no built-in linked list — implement the node structure by hand when the problem specifically requires it

### Stacks / Queues / Deques
- [ ] **C#**: `Stack<T>` and `Queue<T>` — dedicated, O(1) operations
- [ ] **Java**: `Deque<T>` (via `ArrayDeque`) is the modern recommended choice for both stack and queue use
- [ ] **TypeScript**: array `push`/`pop` = O(1) stack; array `shift`/`unshift` = O(n) (everything reindexes) — implement a circular buffer or two-stack trick for a real O(1) queue

### Heaps / Priority Queues
- [ ] **C#**: `PriorityQueue<TElement, TPriority>` (available since .NET 6) — min-heap by default
- [ ] **Java**: `PriorityQueue<T>` — min-heap by default; pass a custom `Comparator` for max-heap or custom ordering
- [ ] **TypeScript**: **no built-in heap at all** — practice implementing one from scratch (array-backed, sift-up/sift-down) ahead of time

### Trees / Sorted Structures
- [ ] **C#**: `SortedSet<T>` / `SortedDictionary<K,V>` — red-black tree based, O(log n) with sorted iteration
- [ ] **Java**: `TreeSet<T>` / `TreeMap<K,V>` — same guarantee; know `Comparable` (natural ordering on the class) vs. `Comparator` (external, pluggable ordering)
- [ ] **TypeScript**: no built-in balanced BST/sorted set — simulate with a sorted array + binary-search insertion, or implement by hand

### Sets
- [ ] **C#**: `HashSet<T>` — O(1) average membership
- [ ] **Java**: `HashSet<T>` — same; `LinkedHashSet<T>` if insertion order matters
- [ ] **TypeScript**: `Set` — O(1) average membership, preserves insertion order

### LINQ / Streams — Performance Pitfalls
- [ ] **C#**: long LINQ chains (`.Where().Select().OrderBy()`) can introduce hidden allocations and multiple passes — prefer explicit loops in a tight complexity budget
- [ ] **Java**: Streams have a similar cost profile — boxing/unboxing of primitives inside a stream pipeline is a common hidden cost
- [ ] **TypeScript**: `.map().filter().reduce()` chains create an intermediate array at every step — a single `for` loop is sometimes the more defensible answer for large inputs

### Quick Reference — "Which language lacks what"
- [ ] TypeScript is missing: a built-in heap/priority queue, a built-in balanced BST/sorted set, a true O(1) queue via array methods — expect to hand-implement these if the problem needs them
- [ ] Java and C# both have full structure coverage out of the box — the risk is knowing *which* one to reach for under time pressure, not lacking the structure