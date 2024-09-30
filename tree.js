class TreeNode {
  constructor(val, children = []) {
    this.val = val;
    this.children = children;
  }
}

class Tree {
  constructor(root = null) {
    this.root = root;
  }

  /** sumValues(): add up all of the values in the tree. */
  sumValues() {
    if (!this.root) return 0; // If the tree is empty, return 0

    const traverse = (node) => {
      let sum = node.val; // Start with the value of the current node
      for (let child of node.children) {
        sum += traverse(child); // Add the sum from each child
      }
      return sum; // Return the total sum for this subtree
    };

    return traverse(this.root); // Start traversing from the root
  }

  /** countEvens(): count all of the nodes in the tree with even values. */
  countEvens() {
    if (!this.root) return 0; // If the tree is empty, return 0

    const traverse = (node) => {
      let count = node.val % 2 === 0 ? 1 : 0; // Check if current node's value is even
      for (let child of node.children) {
        count += traverse(child); // Add the count from each child
      }
      return count; // Return the total count for this subtree
    };

    return traverse(this.root); // Start traversing from the root
  }

  /** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */
  numGreater(lowerBound) {
    if (!this.root) return 0; // If the tree is empty, return 0

    const traverse = (node) => {
      let count = node.val > lowerBound ? 1 : 0; // Check if current node's value is greater than lowerBound
      for (let child of node.children) {
        count += traverse(child); // Add the count from each child
      }
      return count; // Return the total count for this subtree
    };

    return traverse(this.root); // Start traversing from the root
  }
}

module.exports = { Tree, TreeNode };
