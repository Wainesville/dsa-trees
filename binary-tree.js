class BinaryTreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor(root = null) {
    this.root = root;
  }

  /** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */
  minDepth(node = this.root) {
    if (!node) return 0; // If the tree is empty, return 0
    if (!node.left && !node.right) return 1; // Leaf node

    const leftDepth = node.left ? this.minDepth(node.left) : Infinity;
    const rightDepth = node.right ? this.minDepth(node.right) : Infinity;

    return Math.min(leftDepth, rightDepth) + 1; // Return the min depth
  }

  /** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */
  maxDepth(node = this.root) {
    if (!node) return 0; // If the tree is empty, return 0
    if (!node.left && !node.right) return 1; // Leaf node

    const leftDepth = this.maxDepth(node.left);
    const rightDepth = this.maxDepth(node.right);

    return Math.max(leftDepth, rightDepth) + 1; // Return the max depth
  }

  /** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */
  maxSum(node = this.root) {
    let maxSum = -Infinity;

    const traverse = (node) => {
      if (!node) return 0;

      // Max sum from left and right children
      const leftSum = Math.max(0, traverse(node.left)); // Only consider positive sums
      const rightSum = Math.max(0, traverse(node.right));

      // Update the maximum sum found so far
      maxSum = Math.max(maxSum, leftSum + rightSum + node.val);

      // Return the maximum path sum for this node
      return Math.max(leftSum, rightSum) + node.val;
    };

    traverse(node);
    return maxSum;
  }

  /** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */
  nextLarger(lowerBound) {
    let nextLargerValue = null;

    const traverse = (node) => {
      if (!node) return;

      // Check the current node's value
      if (node.val > lowerBound) {
        if (nextLargerValue === null || node.val < nextLargerValue) {
          nextLargerValue = node.val;
        }
      }

      traverse(node.left); // Search left subtree
      traverse(node.right); // Search right subtree
    };

    traverse(this.root);
    return nextLargerValue; // Return the next larger value found
  }

  /** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents.) */
  areCousins(node1, node2) {
    if (!this.root) return false;

    const findDepthAndParent = (node, val, depth, parent) => {
      if (!node) return null;
      if (node.val === val) return { depth, parent };

      return findDepthAndParent(node.left, val, depth + 1, node) ||
             findDepthAndParent(node.right, val, depth + 1, node);
    };

    const node1Info = findDepthAndParent(this.root, node1, 0, null);
    const node2Info = findDepthAndParent(this.root, node2, 0, null);

    return (
      node1Info &&
      node2Info &&
      node1Info.depth === node2Info.depth &&
      node1Info.parent !== node2Info.parent
    );
  }

  /** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */
  lowestCommonAncestor(node1, node2) {
    const findLCA = (node) => {
      if (!node) return null;
      if (node.val === node1 || node.val === node2) return node;

      const leftLCA = findLCA(node.left);
      const rightLCA = findLCA(node.right);

      if (leftLCA && rightLCA) return node; // This is the LCA

      return leftLCA ? leftLCA : rightLCA; // Either one is the LCA
    };

    return findLCA(this.root);
  }

  /** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */
  static serialize(node) {
    if (!node) return 'null';

    return (
      node.val + ',' +
      BinaryTree.serialize(node.left) + ',' +
      BinaryTree.serialize(node.right)
    );
  }

  /** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */
  static deserialize(data) {
    const nodes = data.split(',');
    let index = 0;

    const buildTree = () => {
      if (nodes[index] === 'null') {
        index++;
        return null;
      }

      const node = new BinaryTreeNode(Number(nodes[index]));
      index++;
      node.left = buildTree();
      node.right = buildTree();
      return node;
    };

    return new BinaryTree(buildTree());
  }
}

module.exports = { BinaryTree, BinaryTreeNode };
