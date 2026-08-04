var arr = new DynamicArray<int>(2);
Console.WriteLine("Pushing 1..6 into a DynamicArray with initial capacity 2:");
for (int i = 1; i <= 6; i++) arr.Push(i);
Console.WriteLine($"Final contents: [{string.Join(", ", arr.ToArray())}]");

arr.InsertAt(2, 99);
Console.WriteLine($"After InsertAt(2, 99): [{string.Join(", ", arr.ToArray())}]");

arr.DeleteAtSwap(0);
Console.WriteLine($"After DeleteAtSwap(0): [{string.Join(", ", arr.ToArray())}]");

class DynamicArray<T>
{
    private T[] data;
    private int count;
    private int capacity;

    public DynamicArray(int initialCapacity = 4)
    {
        capacity = initialCapacity;
        data = new T[capacity];
        count = 0;
    }

    public int Size => count;

    public T Get(int index)
    {
        if (index < 0 || index >= count) throw new IndexOutOfRangeException($"Index {index} out of bounds");
        return data[index];
    }

    public void Push(T value)
    {
        if (count == capacity) Resize();
        data[count] = value;
        count++;
    }

    public void DeleteAtSwap(int index)
    {
        if (index < 0 || index >= count) throw new IndexOutOfRangeException($"Index {index} out of bounds");
        data[index] = data[count - 1];
        data[count - 1] = default!;
        count--;
    }

    public void InsertAt(int index, T value)
    {
        if (index < 0 || index > count) throw new IndexOutOfRangeException($"Index {index} out of bounds");
        if (count == capacity) Resize();
        for (int i = count; i > index; i--) data[i] = data[i - 1];
        data[index] = value;
        count++;
    }

    private void Resize()
    {
        capacity *= 2;
        var newData = new T[capacity];
        Array.Copy(data, newData, count);
        data = newData;
        Console.WriteLine($"  [resized to capacity {capacity}]");
    }

    public T[] ToArray()
    {
        var result = new T[count];
        Array.Copy(data, result, count);
        return result;
    }
}

