package com.uniovi.sdi;

import org.codehaus.jackson.node.ObjectNode;

import javax.swing.*;
import javax.swing.border.EmptyBorder;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.core.MediaType;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class Window {
    public JLabel textMemory;
    JFrame frame;
    JPanel panel;
    JButton updateButton;
    JButton turnOffButton;
    int requests = 0;

    public Window() {
        // Frame
        frame = new JFrame("Aplicación Monitorización");
        frame.setSize(500, 200);
        frame.setLocationRelativeTo(null);
        // Panel
        panel = new JPanel();
        panel.setBorder(new EmptyBorder(10, 10, 10, 10));
        panel.setLayout(new BoxLayout(panel, BoxLayout.Y_AXIS));
        frame.add(panel);
        // Botón Actualizar
        updateButton = new JButton("Actualizar Memoria");
        updateButton.setBorder(new EmptyBorder(10, 10, 10, 10));
        updateButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent arg0) {
            }
        });
        panel.add(updateButton);
        // Botón Actualizar
        turnOffButton = new JButton("Apagar Equipo");
        turnOffButton.setBorder(new EmptyBorder(10, 10, 10, 10));
        turnOffButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent arg0) {
                JOptionPane.showMessageDialog(frame, "Enviado apagar!");
            }
        });
        panel.add(turnOffButton);
        // Texto memoria
        textMemory = new JLabel();
        textMemory.setBorder(new EmptyBorder(10, 10, 10, 10));
        textMemory.setText("Memoria libre:");
        panel.add(textMemory);
        // Propiedades visibilidad frame
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setVisible(true);

        updateButton.addActionListener(arg0 -> {
            requests++;
            UpdateMemoryThread thread = new UpdateMemoryThread(Window.this);
            thread.start();
        });
    }

    public void updateMemory(String memory) {
        SwingUtilities.invokeLater(() -> textMemory.setText("Memoria libre: " + memory + " (" +
                requests + ")"));
    }

    public static void main(String[] args) throws InterruptedException {
        new Window();
    }
}