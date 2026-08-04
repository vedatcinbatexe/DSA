class DynamicArray<T> {
    private data: (T | undefined)[];
    private count: number;
    private capacity: number;

    constructor(initialCapacity: number = 4) {
        this.capacity = initialCapacity;
        this.data = new Array(this.capacity);
        this.count = 0;
    }

    get size(): number  {
        return this.count;
    }

    get(index: number): T {
        if (index < 0 || index >= this.count) {
            throw new RangeError("Index out of bounds");
        }

        return this.data[index] as T;
    }

    push(value: T): void {
        if (this.count === this.capacity) {
            this.resize();
        }

        this.data[this.count] = value;
        this.count++;
    }

    deleteAtSwap(index: number): void {
        if (index < 0 || index >= this.count) {
            throw new RangeError("Index out of bounds");
        }
        this.data[index] = this.data[this.count-1];
        this.data[this.count - 1] = undefined;
        this.count--;
    }

    insertAt(index: number, value: T): void {
        if (index < 0 || index > this.count) {
            throw new RangeError("Index out of bounds");
        }

        if (this.count === this.capacity) {
            this.resize();
        }

        for (let i = this.count; i > index; i--) {
            this.data[i] = this.data[i - 1];
        }

        this.data[index] = value;
        this.count++;
    }

    private resize(): void {
        this.capacity *= 2;
        const newData = new Array(this.capacity);
        for(let i = 0; i < this.count; i++) {
            newData[i] = this.data[i];
        }
        this.data = newData;
        console.log(`Resized array to new capacity: ${this.capacity}`);
    }


    toArray(): T[] {
        return this.data.slice(0, this.count) as T[];
    }

}


const arr = new DynamicArray<number>(2);
console.log("Pushing 1..6 into a DynamicArray with initial capacity 2");
for (let i = 1; i <= 6; i++) arr.push(i);
console.log("Final content of the array:", arr.toArray());

arr.insertAt(2, 99);
console.log("After inserting 99 at index 2:", arr.toArray());

arr.deleteAtSwap(0);
console.log("After deleting element at index 0 (swap with last):", arr.toArray());