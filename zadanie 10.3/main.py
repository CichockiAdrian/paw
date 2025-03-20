def read_graph(filename):
    with open(filename, 'r') as file:
        num_vertices = int(file.readline())
        adjacency_list = []
        for line in file:
            neighbors = list(map(int, line.split()))
            adjacency_list.append(neighbors)
    return adjacency_list, num_vertices

def write_neighbours_list(adjacency_list):
    for i, neighbors in enumerate(adjacency_list):
        print(f"Sąsiadami wierzchołka {i} są: {', '.join(map(str, neighbors))}")

def list_to_matrix(adjacency_list, num_vertices):
    matrix = [[0] * num_vertices for _ in range(num_vertices)]
    for i, neighbors in enumerate(adjacency_list):
        for neighbor in neighbors:
            matrix[i][neighbor] = 1
    return matrix

def write_matrix(matrix):
    for row in matrix:
        print(' '.join(map(str, row)))

def main():
    filename = 'graph.txt'
    adjacency_list, num_vertices = read_graph(filename)
    print("Lista sąsiedztwa:")
    write_neighbours_list(adjacency_list)
    matrix = list_to_matrix(adjacency_list, num_vertices)
    print("\nMacierz sąsiedztwa:")
    write_matrix(matrix)

if __name__ == "__main__":
    main()
