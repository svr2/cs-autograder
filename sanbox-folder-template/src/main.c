#include <stdio.h>
#define MAX_BOOKS 10;


int main() {

  // array of books
  // Book 1
  char firstName[32][10][10];
  char lastName[32][10][10];
  char bookTitle[128][10];
  char publishedCompany[64][10];
  char publishedCity[64][10];
  unsigned int publicationYear[10]; // [1475,2022]
  unsigned long long isbn[10];      // actually it is isbn13 but that looks ugly
  unsigned int edition[10];

  int bookIdx = 0;

  while (1) {
    printf("\nPlease enter details for Book #%d\n", bookIdx + 1);
    printf("Please enter first name: ");
    scanf("%32s", firstName + bookIdx);

    printf("Please enter last name: ");
    scanf("%32s", lastName + bookIdx);

    printf("Please enter book title: ");
    scanf("%128s", bookTitle + bookIdx);

    printf("Please enter published company: ");
    scanf("%64s", publishedCompany + bookIdx);

    printf("Please enter published city: ");
    scanf("%64s", publishedCity + bookIdx);

    printf("Please enter published year: ");
    scanf("%d", publicationYear + bookIdx);
    if ((publicationYear[bookIdx] < 1475) | (publicationYear[bookIdx] > 2022)) {
      printf("You have entered invalid input for publicationYear. Please try "
             "again.\n");
      continue;
    }

    printf("Please enter isbn13: ");
    if (scanf("%llu", isbn + bookIdx) != 1) {
      printf("You have entered invalid input for isbn. Please try again.\n");
      continue;
    };

    printf("Please enter edition: ");
    getchar();
    char edtLine[100];
    fgets(edtLine, sizeof(edtLine),
          stdin); // use this instead because gets is dangerous
    sscanf(edtLine, "%d", edition + bookIdx);

    if (bookIdx < 9) {
      char opt;
      printf("Would you like add another book? [y/n][yes/no]:");
      scanf("%c", &opt);
      if (opt == 'y') {
        bookIdx++;
        continue;
      } else {
        break;
      }
    }
  }

  for (size_t i = 0; i <= bookIdx; i++) {
    // print book
    printf("\nInfo for book %d\n", i + 1);
    printf("First Name: %s\n", firstName[i]);
    printf("Last Name: %s\n", lastName[i]);
    printf("Book Title: %s\n", bookTitle[i]);
    printf("Published Company: %s\n", publishedCompany[i]);
    printf("Published City: %s\n", publishedCity[i]);
    printf("Published Year: %d\n", publicationYear[i]);
    printf("ISBN: %llu\n", isbn[i]);
    printf("Edition: %d\n", edition[i]);
  }

  return 0;
}
