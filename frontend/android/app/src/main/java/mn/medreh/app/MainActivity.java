package mn.medreh.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(HapticWaveformPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
