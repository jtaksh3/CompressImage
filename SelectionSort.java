import java.util.Scanner;

public class FirstOne {
    public static void main(String[] aksh){
        int j, key;
        Scanner scan = new Scanner(System.in);
        System.out.println("Enter the no. of elements to be sorted");
        int n = scan.nextInt();
        int[] a = new int[n];
        System.out.println("Enter "+n+" Numbers to be sorted");
        for(int i = 0; i < n; i++)
            a[i] = scan.nextInt();
        for(int i = 1; i < n; i++){
            key = a[i];
            j = i - 1;
            while(j >= 0 && key < a[j]){
                a[j+1] = a[j];
                j--;
            }
            a[j+1] = key;
        }
        for(int i = 0; i < n; i++)
            System.out.println(a[i]);
    }
}
