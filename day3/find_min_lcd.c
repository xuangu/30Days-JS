int gcd(int, int);
int lcd(int, int, int);
int getmin(int *);

#include <stdio.h>
int main() {
    printf("%d\n", gcd(100, 20));
}

int lcd(int a, int b, int c) {

}

int gcd(int a, int b) {
    do {
        b = a % b;
        a = b;
    } while (b > 0);

    return a;
}

int getmin(int *arr) {

}
