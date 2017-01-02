function Node(name, x, y) {
	this.name = name;
	this.x = x;
	this.y = y;
	this.previous = null;
	this.next = null;
}

function DoublyLinkedCycle() {
	this.length = 0;
	this.head = null;
	this.tail = null;
}

DoublyLinkedCycle.prototype.add = function(name, x, y) {
    var node = new Node(name, x, y);
 
    if (this.length) {
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