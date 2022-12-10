/**
 * datastructures-js/binary-search-tree
 * @copyright 2020 Eyas Ranjous <eyas.ranjous@gmail.com>
 * @license MIT
 */

// const { BinarySearchTree } = require('./binarySearchTree');
// const { AvlTreeNode } = require('./avlTreeNode');

/**
 * @class AvlTree
 * @extends BinarySearchTree
 */
class AvlTree extends BinarySearchTree {
  constructor(compare) {
    if (compare && typeof compare !== 'function') {
      throw new Error('AvlTree constructor expects a compare function');
    }

    super(compare);
  }

  /**
   * Applies the proper rotation on a node
   * @private
   * @param {AvlTreeNode} node
   */
  _balanceNode(node) {
    if (!node) return;

    node.updateHeight();
    const balance = node.getBalance();
    if (balance > 1) {
      if (node.getLeft().hasLeft()) {
        node.rotateRight();
      } else if (node.getLeft().hasRight()) {
        node.rotateLeftRight();
      }
    } else if (balance < -1) {
      if (node.getRight().hasRight()) {
        node.rotateLeft();
      } else if (node.getRight().hasLeft()) {
        node.rotateRightLeft();
      }
    }

    // check if root was rotated
    if ((balance < -1 || balance > 1) && node === this._root) {
      // replace root when rotated with the child (now parent of root)
      this._root = node.getParent();
    }
  }

  /**
   * Inserts a value into the tree and maintains
   * the tree balanced by making the necessary rotations
   *
   * @public
   * @param {number|string|object} value
   * @return {AvlTree}
   */
  insert(value, x=-1) {
    const newNode = new AvlTreeNode(value, this._compare);
    const insertRecursive = (current, x) => {
      const compare = this._compare(value, current.getValue(), x);
      if (compare < 0) {
        if (current.hasLeft()) {
          insertRecursive(current.getLeft(), x);
          this._balanceNode(current); // backward-tracking
        } else {
          newNode.setParent(current);
          current.setLeft(newNode).updateHeight();
          this._count += 1;
        }
      } else if (compare > 0) {
        if (current.hasRight()) {
          insertRecursive(current.getRight(), x);
          this._balanceNode(current); // backward-tracking
        } else {
          newNode.setParent(current);
          current.setRight(newNode).updateHeight();
          this._count += 1;
        }
      } else {
        // return
        current.setValue(value);
      }
    };

    if (this._root === null) {
      this._root = newNode;
      this._count += 1;
    } else {
      insertRecursive(this._root, x);
    }

    return this;
  }

  /**
   * Removes a node from the tree and maintains
   * the tree balanced by making the necessary rotations
   *
   * @public
   * @param {number|string|object} value
   * @return {boolean}
   */
  remove(value, x=-1) {
    const removeRecursively = (val, current, x) => {
      if (current === null) {
        console.log("nicnieusunieto==========")
        return false;
      }

      const compare = this._compare(val, current.getValue(), x);
      if (compare < 0) {
        const removed = removeRecursively(val, current.getLeft(), x);
        this._balanceNode(current);
        return removed;
      }

      if (compare > 0) {
        const removed = removeRecursively(val, current.getRight(), x);
        this._balanceNode(current);
        return removed;
      }

      // current node is the node to remove

      // case 1: node has no children
      if (current.isLeaf()) {
        if (current.isRoot()) {
          this._root = null;
        } else if (this._compare(val, current.getParent().getValue(), x) < 0) {
          current.getParent().setLeft(null).updateHeight();
        } else {
          current.getParent().setRight(null).updateHeight();
        }
        this._count -= 1;
        // console.log("usuniento: ", current._value.line, current._value.value)
        return true;
      }

      // case 2: node has a left child and no right child
      if (!current.hasRight()) {
        if (current.isRoot()) {
          this._root = current.getLeft();
        } else if (this._compare(val, current.getParent().getValue(), x) < 0) {
          current.getParent().setLeft(current.getLeft()).updateHeight();
        } else {
          current.getParent().setRight(current.getLeft()).updateHeight();
        }
        current.getLeft().setParent(current.getParent());
        this._count -= 1;
        // console.log("usuniento: ", current._value.line)
        return true;
      }

      // case 3: node has a right child and no left child
      if (!current.hasLeft()) {
        if (current.isRoot()) {
          this._root = current.getRight();
        } else if (this._compare(val, current.getParent().getValue(), x) < 0) {
          current.getParent().setLeft(current.getRight()).updateHeight();
        } else {
          current.getParent().setRight(current.getRight()).updateHeight();
        }
        current.getRight().setParent(current.getParent());
        this._count -= 1;
        // console.log("usuniento: ", current._value.line)
        return true;
      }

      // case 4: node has left and right children
      const minRight = this.min(current.getRight());
      const removed = removeRecursively(minRight.getValue(), minRight, x);
      current.setValue(minRight.getValue()).setValue(minRight.getValue());
      this._balanceNode(current);
      return removed;
    };

    return removeRecursively(value, this._root, x);
  }

  removeTraversing(value, x=-1) {
    this.AAAA = false
    const removeRecursively = (val, current, x) => {

      

      if (current === null) {
        // console.log("nicnieusunieto==========")
        return false;
      }

      // const compare = this._compare(val, current.getValue(), x);
      // if (compare < 0) {
      //   const removed = removeRecursively(val, current.getLeft(), x);
      //   this._balanceNode(current);
      //   return removed;
      // }

      // if (compare > 0) {
      //   const removed = removeRecursively(val, current.getRight(), x);
      //   this._balanceNode(current);
      //   return removed;
      // }
      // this._balanceNode(current);
      if (val.line.p1.x == current.getValue().line.p1.x && val.line.p1.y == current.getValue().line.p1.y &&
      val.line.p2.x == current.getValue().line.p2.x && val.line.p2.y == current.getValue().line.p2.y){
// current node is the node to remove

      // case 1: node has no children
      if (current.isLeaf()) {
        if (current.isRoot()) {
          this._root = null;
        } else if (this._compare(val, current.getParent().getValue(), x) < 0) {
          current.getParent().setLeft(null).updateHeight();
        } else {
          current.getParent().setRight(null).updateHeight();
        }
        this._count -= 1;
        // console.log("usuniento: ", current._value.line, current._value.value)
        return true;
      }

      // case 2: node has a left child and no right child
      if (!current.hasRight()) {
        if (current.isRoot()) {
          this._root = current.getLeft();
        } else if (this._compare(val, current.getParent().getValue(), x) < 0) {
          current.getParent().setLeft(current.getLeft()).updateHeight();
        } else {
          current.getParent().setRight(current.getLeft()).updateHeight();
        }
        current.getLeft().setParent(current.getParent());
        this._count -= 1;
        // console.log("usuniento: ", current._value.line)
        return true;
      }

      // case 3: node has a right child and no left child
      if (!current.hasLeft()) {
        if (current.isRoot()) {
          this._root = current.getRight();
        } else if (this._compare(val, current.getParent().getValue(), x) < 0) {
          current.getParent().setLeft(current.getRight()).updateHeight();
        } else {
          current.getParent().setRight(current.getRight()).updateHeight();
        }
        current.getRight().setParent(current.getParent());
        this._count -= 1;
        // console.log("usuniento: ", current._value.line)
        return true;
      }

      // case 4: node has left and right children
      const minRight = this.min(current.getRight());
      const removed = removeRecursively(minRight.getValue(), minRight, x);
      current.setValue(minRight.getValue()).setValue(minRight.getValue());
      this._balanceNode(current);
      return removed;
      }

      
    };
    const traverseRecursive = (val, current, x) => {
      if (current === null) return false;
      this.result = removeRecursively(val, current, x)
      if (this.result){
        this.AAAA = true
        console.log("udalosie")
        // return true
      }
      return traverseRecursive(val, current.getLeft(), x) || traverseRecursive(val, current.getRight(), x);
    };
    return traverseRecursive(value, this._root, x);
  }

}

// exports.AvlTree = AvlTree;
