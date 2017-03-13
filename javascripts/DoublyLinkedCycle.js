/**
 *  @function Node
 *  @param name
 *  @param x
 *  @param y
 *  Node class for doubly linked cycle, storing the next and previous nodes for that node.
 */
function Node(num, name, x, y) {
	this.num      = num;
	this.name     = name;
	this.x        = x;
	this.y        = y;
	this.previous = null;
	this.next     = null;
}

/**
 *  @function DoublyLinkedCycle
 *  DoublyLinkedCycle class, storing length, head, and tail
 */
function DoublyLinkedCycle() {
	this.length = 0;
	this.head = null;
	this.tail = null;
}

/**
 *  @function add of class DoublyLinkedCycle
 *  @param name
 *  @param x
 *  @param y
 *  Sets new nodes and adds them to the cycle. 
 *  If the cycle is empty, it sets the new node to head and tail. 
 *  Otherwise, it makes the new node the tail, and connects the tail to the head both directions.
 */
DoublyLinkedCycle.prototype.add = function(num, name, x, y) {
    var node = new Node(num, name, x, y);
 
    if (this.length > 0) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
		this.tail.next = this.head;
		this.head.prev = this.tail;
    } else {
        this.head = node;
        this.tail = node;
		this.tail.next = this.head;
		this.head.prev = this.tail;
    }
 
    this.length++;
     
    return node;
};