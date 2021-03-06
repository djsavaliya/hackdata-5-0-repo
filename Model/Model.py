import pandas as pd
import numpy as ny
from sklearn.model_selection import train_test_split
import matplotlib.pyplot as plt
from matplotlib import style

iterations=1000
alpha=1

def sig(z):
    return 1/(1+ny.exp(z))

def hyp(theta, x):
    z=ny.dot(x, theta)
    return sig(z)

def cost(hyp_x, y, m):
    return sum((-1/m)*(y*ny.log(hyp_x)+(1-y)*ny.log(1-hyp_x)))

def deri(y, hyp_x, x, f):
    d=(hyp_x-y)*x
    de=sum(d)
    de=de.reshape(f, 1)
    return de

data=pd.read_csv("Training Set.csv", sep=",")

answer="Participant_Type"
new_data=data
new_data.drop('ID', axis=1, inplace=True)
new_data.drop('Participant_Level', axis=1, inplace=True)

x=ny.array(new_data.drop([answer], 1))
y=ny.zeros((x.shape[0], 1))
p=ny.array(data[answer])
og=ny.zeros((x.shape[0], 1))

for i in range(0, y.shape[0]):
    y[i] = p[i]
    og[i] = p[i]

x_train, x_test, y_train, y_test, og_train, og_test = train_test_split(x, y, og, test_size=0.33, random_state=45)

style.use('ggplot')

predict=ny.zeros((x_train.shape[0], 4))
theta_t_series = ny.zeros((4, x_train.shape[1], 1))

for j in range(1, 5):
    for i in range(0, y_train.shape[0]):
        if (og_train[i] == j):
            y_train[i] = 1
        else:
            y_train[i] = 0

    m = x_train.shape[0]
    feat = x_train.shape[1]
    theta_t = ny.zeros((feat, 1))
    j_theta = ny.zeros((1, iterations))

    q = 0

    for a in range(iterations):
        cost_a = 0
        dcost = ny.zeros((feat, 1))
        q = q + 1
        hyp_x = hyp(theta_t, x_train)
        cost_a = sum(cost(hyp_x, y_train, m))
        dcost = (deri(hyp_x, y_train, x_train, feat))
        print(q)
        theta_t = theta_t - (alpha / m) * dcost
        plt.scatter(q, cost_a)

    theta_t_series[j-1]=theta_t
    plt.show()

    hypo = hyp(theta_t, x_train)
    for i in range(0, m):
        predict[i][j-1]=hypo[i]

n=predict.shape[0]
final_answer=ny.zeros((n, 1))

for i in range(0, n):
    temp=max(predict[i][0], max(predict[i][1], max(predict[i][2], predict[i][3])))
    if (temp==predict[i][0]):
        final_answer[i]=1;
    elif (temp==predict[i][1]):
        final_answer[i]=2;
    elif (temp==predict[i][2]):
        final_answer[i]=3
    elif (temp == predict[i][3]):
        final_answer[i] = 4

acc = 0
for i in range(0, m):
    if (final_answer[i] == og_train[i]):
        acc = acc + 1

# Model Accuray is affected due to the use of dummy(not well built) dataset
print("Train Accuracy:")
print(acc / m)

p = x_test.shape[0]
acc_test = 0
predict1 = ny.zeros((p, 4))
final_answer1 = ny.zeros((p, 1))

for j in range (0, 4):
    hypo1 = hyp(theta_t_series[j], x_test)
    for i in range(0, p):
        predict1[i][j] = hypo1[i]

for i in range(0, p):
    temp=max(predict1[i][0], max(predict1[i][1], max(predict1[i][2], predict1[i][3])))
    if (temp==predict[i][0]):
        final_answer1[i]=1;
    elif (temp==predict[i][1]):
        final_answer1[i]=2;
    elif (temp==predict[i][2]):
        final_answer1[i]=3
    elif (temp == predict[i][3]):
        final_answer1[i] = 4

for i in range(0, p):
    if (final_answer1[i] == og_test[i]):
        acc_test = acc_test + 1

# Model Accuray is affected due to the use of dummy(not well built) dataset
print("Test Accuracy:")
print(acc_test / p)
