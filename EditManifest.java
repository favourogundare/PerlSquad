import java.io.*;
import java.applet.Applet;
public class EditManifest extends Applet {
	public int  methodReturningInt() { return 5; }
	public String methodReturningString() { return "Hello"; }
	public static void copyFile() throws IOException {
		FileInputStream   in = null;
		FileOutputStream out = null;
		
		try {
			in = new FileInputStream("javascripts/ManifestDefault.js");
			out = new FileOutputStream("output.txt");

			int c;
			while ((c = in.read()) != -1) {
				out.write(c);
			}
		}finally {
			if (in != null) {
				in.close();
			}
			if (out != null) {
				out.close();
			}
		}
	}
}
