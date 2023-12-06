function swap<T>(arr: T[], i: number, j: number) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

function parent(i: number) {
  return Math.floor(i / 2);
}
function leftChild(i: number) {
  return 2 * i;
}

function rightChild(i: number) {
  return 2 * i + 1;
}

function createMaxHeap<HeapValueT>() {
  let values: HeapValueT[] = [];
  let size = 0;

  function downHeapify(pos: number) {
    if (pos >= size / 2 && pos <= size) return;

    if (
      values[pos] < values[leftChild(pos)] ||
      values[pos] < values[rightChild(pos)]
    ) {
      if (values[leftChild(pos)] > values[rightChild(pos)]) {
        swap(values, pos, leftChild(pos));

        downHeapify(leftChild(pos));
      } else {
        swap(values, pos, rightChild(pos));
        downHeapify(rightChild(pos));
      }
    }
  }
  function heapifyUp(pos: number) {
    let temp = values[pos];
    while (pos > 0 && temp > values[parent(pos)]) {
      values[pos] = values[parent(pos)];
      pos = parent(pos);
    }
    values[pos] = temp;
  }
  function insert(element: HeapValueT) {
    values[++size] = element;
    let current = size;
    heapifyUp(current);
  }
  function extractMax(): HeapValueT {
    let max = values[1];
    values[1] = values[size--];
    downHeapify(1);
    return max;
  }
  return {
    insert,
    extractMax,
  };
}

export { createMaxHeap };
