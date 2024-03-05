import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Label;
import javafx.stage.Stage;

public class HelloWorldApp extends Application {

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage primaryStage) {
        primaryStage.setTitle("Hello Window");

        // Create a label with the message
        Label label = new Label("Hello");

        // Create a scene with the label
        Scene scene = new Scene(label, 200, 100);

        // Set the scene to the primary stage
        primaryStage.setScene(scene);

        // Show the stage
        primaryStage.show();
    }
}